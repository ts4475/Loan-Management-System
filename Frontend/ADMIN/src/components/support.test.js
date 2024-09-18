import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import Support from '../components/Support';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('Support Component', () => {
  const userId = '1';
  const openTickets = [
    { support_id: 1, customer_id: 1, subject: 'Issue 1', description: 'Description 1', attachment_url: null },
    { support_id: 2, customer_id: 1, subject: 'Issue 2', description: 'Description 2', attachment_url: null },
  ];
  const closedTickets = [
    { support_id: 3, customer_id: 1, subject: 'Issue 3', description: 'Description 3', reply: 'Resolved', attachment_url: null },
  ];

  beforeEach(() => {
    mock.reset();
    localStorage.setItem('user_id', userId);
  });

  test('renders Support component and fetches open and closed tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Support Page')).toBeInTheDocument();
    expect(screen.getByText('Open Tickets')).toBeInTheDocument();
    expect(screen.getByText('Closed Tickets')).toBeInTheDocument();

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
      expect(screen.getByText('Issue 2')).toBeInTheDocument();
      expect(screen.getByText('Issue 3')).toBeInTheDocument();
    });
  });

  test('searches and filters open tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
    });

    // Simulate search input
    fireEvent.change(screen.getByPlaceholderText('Search by Support ID, Customer ID, Subject, Description'), {
      target: { value: 'Issue 1' },
    });

    // Check if the filtered ticket is displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
      expect(screen.queryByText('Issue 2')).not.toBeInTheDocument();
    });
  });

  test('sorts open tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
    });

    // Simulate sort by Customer ID
    fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'customer_id' } });
    fireEvent.change(screen.getByLabelText('Sort order:'), { target: { value: 'desc' } });

    // Check if the tickets are sorted
    await waitFor(() => {
      const sortedTickets = screen.getAllByText(/Customer ID:/);
      expect(sortedTickets[0]).toHaveTextContent('1');
    });
  });

  test('paginates open tickets', async () => {
    const manyTickets = Array.from({ length: 10 }, (_, i) => ({
      support_id: i + 1,
      customer_id: 1,
      subject: `Issue ${i + 1}`,
      description: `Description ${i + 1}`,
      attachment_url: null,
    }));

    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, manyTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
    });

    // Simulate clicking on the second page
    fireEvent.click(screen.getAllByText('2')[0]);

    // Check if the second page of tickets is displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 6')).toBeInTheDocument();
    });
  });

  test('resolves an open ticket', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);
    mock.onPatch(`http://localhost:8085/supports/partial-update/1`).reply(200);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
    });

    // Simulate resolving a ticket
    fireEvent.change(screen.getAllByPlaceholderText('Reply...')[0], { target: { value: 'Resolved' } });
    fireEvent.click(screen.getAllByText('Mark as Resolved')[0]);

    // Check if the ticket is moved to closed tickets
    await waitFor(() => {
      expect(screen.queryByText('Issue 1')).not.toBeInTheDocument();
      expect(screen.getByText('Resolved')).toBeInTheDocument();
    });
  });

  test('deletes a closed ticket', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);
    mock.onDelete(`http://localhost:8085/supports/delete/3`).reply(200);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 3')).toBeInTheDocument();
    });

    // Simulate deleting a ticket
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Check if the ticket is removed from the closed tickets list
    await waitFor(() => {
      expect(screen.queryByText('Issue 3')).not.toBeInTheDocument();
    });
  });

  test('displays "No open tickets available" when there are no open tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, []);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('No open tickets available')).toBeInTheDocument();
    });
  });

  test('displays "No closed tickets available" when there are no closed tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, []);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('No closed tickets available')).toBeInTheDocument();
    });
  });

  test('handles error when fetching open tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(500);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching open tickets')).toBeInTheDocument();
    });
  });

  test('handles error when fetching closed tickets', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(500);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching closed tickets')).toBeInTheDocument();
    });
  });

  test('handles error when resolving a ticket', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);
    mock.onPatch(`http://localhost:8085/supports/partial-update/1`).reply(500);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
    });

    // Simulate resolving a ticket
    fireEvent.change(screen.getAllByPlaceholderText('Reply...')[0], { target: { value: 'Resolved' } });
    fireEvent.click(screen.getAllByText('Mark as Resolved')[0]);

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error resolving ticket')).toBeInTheDocument();
    });
  });

  test('handles error when deleting a ticket', async () => {
    mock.onGet(`http://localhost:8085/supports/open/${userId}`).reply(200, openTickets);
    mock.onGet(`http://localhost:8085/supports/closed/${userId}`).reply(200, closedTickets);
    mock.onDelete(`http://localhost:8085/supports/delete/3`).reply(500);

    render(
      <BrowserRouter>
        <Support />
      </BrowserRouter>
    );

    // Wait for the tickets to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Issue 3')).toBeInTheDocument();
    });

    // Simulate deleting a ticket
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error deleting ticket')).toBeInTheDocument();
    });
  });
});

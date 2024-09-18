import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import ActiveLoans from '../components/ActiveLoans';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('ActiveLoans Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders ActiveLoans component and fetches loan data', async () => {
    // Mock the GET request to fetch loans
    mock.onGet('http://localhost:9191/api/loans').reply(200, [
      {
        id: 1,
        customerId: 10,
        amount: 1000,
        status: 'active'
      }
    ]);

    render(
      <BrowserRouter>
        <ActiveLoans />
      </BrowserRouter>
    );

    // Wait for the loan data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Loan ID')).toBeInTheDocument();
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('filters loans by search term', async () => {
    // Mock the GET request to fetch loans
    mock.onGet('http://localhost:9191/api/loans').reply(200, [
      {
        id: 1,
        customerId: 10,
        amount: 1000,
        status: 'active'
      },
      {
        id: 2,
        customerId: 20,
        amount: 2000,
        status: 'active'
      }
    ]);

    render(
      <BrowserRouter>
        <ActiveLoans />
      </BrowserRouter>
    );

    // Wait for the loan data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Loan ID')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search by Loan ID or Customer ID'), { target: { value: '2' } });

    await waitFor(() => {
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  test('sorts loans by selected field and order', async () => {
    // Mock the GET request to fetch loans
    mock.onGet('http://localhost:9191/api/loans').reply(200, [
      {
        id: 1,
        customerId: 10,
        amount: 1000,
        status: 'active'
      },
      {
        id: 2,
        customerId: 20,
        amount: 2000,
        status: 'active'
      }
    ]);

    render(
      <BrowserRouter>
        <ActiveLoans />
      </BrowserRouter>
    );

    // Wait for the loan data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Loan ID')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Loan Amount'));
    fireEvent.click(screen.getByText('Loan Amount'));

    const loanRows = screen.getAllByRole('row');
    expect(loanRows[1]).toHaveTextContent('2');
    expect(loanRows[2]).toHaveTextContent('1');
  });

  test('paginates loan list', async () => {
    // Mock the GET request to fetch loans
    mock.onGet('http://localhost:9191/api/loans').reply(200, Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      customerId: index + 10,
      amount: (index + 1) * 1000,
      status: 'active'
    })));

    render(
      <BrowserRouter>
        <ActiveLoans />
      </BrowserRouter>
    );

    // Wait for the loan data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Loan ID')).toBeInTheDocument();
    });

    // Check that only 10 items are displayed per page
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(11); // 10 data rows + 1 header row

    // Click the "Next" pagination button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Wait for the next page of customers to be displayed
    await waitFor(() => {
      expect(screen.getByText('11')).toBeInTheDocument();
    });

    expect(screen.getByText('15')).toBeInTheDocument();

    // Check that the previous page items are no longer displayed
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});

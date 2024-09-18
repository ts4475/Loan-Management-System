import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import Customer from '../components/Customer'; // Adjust the import path as needed

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('Customer Component', () => {
  const customers = [
    {
      user_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      createdAt: '2023-01-01T00:00:00Z',
      role: 'CUSTOMER'
    },
    {
      user_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      createdAt: '2023-02-01T00:00:00Z',
      role: 'CUSTOMER'
    }
  ];

  beforeEach(() => {
    mock.reset();
  });

  test('renders Customer component and fetches customer data', async () => {
    mock.onGet('http://localhost:8082/users/read').reply(200, customers);

    render(
      <BrowserRouter>
        <Customer />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('View Customer Details')).toBeInTheDocument();

    // Wait for customer data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  test('filters customers by search term', async () => {
    mock.onGet('http://localhost:8082/users/read').reply(200, customers);

    render(
      <BrowserRouter>
        <Customer />
      </BrowserRouter>
    );

    // Wait for customer data to be fetched
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Enter search term
    fireEvent.change(screen.getByPlaceholderText('Search Customer'), { target: { value: 'John' } });

    // Check if the filtered result is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('sorts customers by selected field', async () => {
    mock.onGet('http://localhost:8082/users/read').reply(200, customers);

    render(
      <BrowserRouter>
        <Customer />
      </BrowserRouter>
    );

    // Wait for customer data to be fetched
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Sort by Last Name in descending order
    fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'last_name' } });
    fireEvent.change(screen.getByLabelText('Sort Order:'), { target: { value: 'desc' } });

    // Check if the sorted result is displayed
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Jane Smith');
    expect(rows[2]).toHaveTextContent('John Doe');
  });

  test('filters customers by date range', async () => {
    mock.onGet('http://localhost:8082/users/read').reply(200, customers);

    render(
      <BrowserRouter>
        <Customer />
      </BrowserRouter>
    );

    // Wait for customer data to be fetched
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Set date range
    fireEvent.change(screen.getByLabelText('Filter by date:'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Filter by date:'), { target: { value: '2023-01-31' } });

    // Check if the filtered result is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('handles pagination correctly', async () => {
    const largeCustomerList = Array.from({ length: 25 }, (_, i) => ({
      user_id: i + 1,
      first_name: `Customer${i + 1}`,
      last_name: `Test`,
      email: `customer${i + 1}@example.com`,
      phone: '1234567890',
      createdAt: '2023-01-01T00:00:00Z',
      role: 'CUSTOMER'
    }));

    mock.onGet('http://localhost:8082/users/read').reply(200, largeCustomerList);

    render(
      <BrowserRouter>
        <Customer />
      </BrowserRouter>
    );

    // Wait for customer data to be fetched
    await waitFor(() => {
      expect(screen.getByText('Customer1 Test')).toBeInTheDocument();
    });

    // Check if pagination buttons are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Navigate to page 2
    fireEvent.click(screen.getByText('2'));

    // Check if the customers on page 2 are displayed
    await waitFor(() => {
      expect(screen.getByText('Customer11 Test')).toBeInTheDocument();
      expect(screen.getByText('Customer20 Test')).toBeInTheDocument();
    });
  });
});

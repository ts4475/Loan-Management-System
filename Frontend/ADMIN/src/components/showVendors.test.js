import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowVendors from '../components/ShowVendors';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('ShowVendors Component', () => {
  const vendors = [
    { vendor_id: 1, vendor_name: 'Vendor 1', vendor_logo: 'logo1.png', contact_phone: '1234567890', contact_email: 'vendor1@example.com' },
    { vendor_id: 2, vendor_name: 'Vendor 2', vendor_logo: 'logo2.png', contact_phone: '0987654321', contact_email: 'vendor2@example.com' },
  ];

  const loanProducts = [
    { product_id: 1, product_name: 'Personal', vendor: { vendor_id: 1 } },
    { product_id: 2, product_name: 'Gold', vendor: { vendor_id: 2 } },
  ];

  beforeEach(() => {
    mock.reset();
  });

  test('renders ShowVendors component and fetches vendors and loan products', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/loan-products/read').reply(200, loanProducts);

    render(
      <Router>
        <ShowVendors />
      </Router>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Vendor Details')).toBeInTheDocument();

    // Wait for the vendors and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
      expect(screen.getByText('Vendor 2')).toBeInTheDocument();
    });
  });

  test('searches and filters vendors', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/loan-products/read').reply(200, loanProducts);

    render(
      <Router>
        <ShowVendors />
      </Router>
    );

    // Wait for the vendors and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
    });

    // Simulate search input
    fireEvent.change(screen.getByPlaceholderText('Search Vendor'), {
      target: { value: 'Vendor 1' },
    });

    // Check if the filtered vendor is displayed
    await waitFor(() => {
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
      expect(screen.queryByText('Vendor 2')).not.toBeInTheDocument();
    });
  });

  test('sorts vendors', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/loan-products/read').reply(200, loanProducts);

    render(
      <Router>
        <ShowVendors />
      </Router>
    );

    // Wait for the vendors and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
    });

    // Simulate sort by Vendor Name
    fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'vendor_name' } });
    fireEvent.change(screen.getByLabelText('Sort by:').nextSibling, { target: { value: 'desc' } });

    // Check if the vendors are sorted
    await waitFor(() => {
      const sortedVendors = screen.getAllByText(/Vendor/);
      expect(sortedVendors[0]).toHaveTextContent('Vendor 2');
      expect(sortedVendors[1]).toHaveTextContent('Vendor 1');
    });
  });

  test('displays vendor products correctly', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/loan-products/read').reply(200, loanProducts);

    render(
      <Router>
        <ShowVendors />
      </Router>
    );

    // Wait for the vendors and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
      expect(screen.getByText('Vendor 2')).toBeInTheDocument();
    });

    // Check if the vendor products are displayed correctly
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
  });

  test('handles errors when fetching vendors', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(500);
    mock.onGet('http://localhost:8084/loan-products/read').reply(200, loanProducts);

    render(
      <Router>
        <ShowVendors />
      </Router>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching vendor data')).toBeInTheDocument();
    });
  });

  test('handles errors when fetching loan products', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/loan-products/read').reply(500);

    render(
      <Router>
        <ShowVendors />
      </Router>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching loan products data')).toBeInTheDocument();
    });
  });
});

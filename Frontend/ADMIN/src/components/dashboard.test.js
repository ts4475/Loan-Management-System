import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

// Mock the axios instance
const mock = new MockAdapter(axios);

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => (store[key] = value),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Dashboard Component', () => {
  const adminData = { first_name: 'Admin' };
  const vendors = [
    { vendor_logo: 'logo1.png' },
    { vendor_logo: 'logo2.png' },
    { vendor_logo: 'logo3.png' },
    { vendor_logo: 'logo4.png' },
  ];

  beforeEach(() => {
    mock.reset();
    localStorage.setItem('user_id', '1');
  });

  test('renders Dashboard component and fetches admin name and vendor logos', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Welcome,')).toBeInTheDocument();

    // Wait for admin name and vendor logos to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Welcome, Admin')).toBeInTheDocument();
      expect(screen.getAllByAltText(/^Vendor \d+$/).length).toBe(vendors.length);
    });
  });

  test('handles navigation buttons correctly', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);

    const { getByText } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Welcome,')).toBeInTheDocument();

    // Wait for admin name and vendor logos to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Welcome, Admin')).toBeInTheDocument();
      expect(screen.getAllByAltText(/^Vendor \d+$/).length).toBe(vendors.length);
    });

    // Simulate navigation button clicks
    fireEvent.click(getByText('Add Vendor'));
    expect(window.location.pathname).toBe('/add-vendor');

    fireEvent.click(getByText('Update Vendor'));
    expect(window.location.pathname).toBe('/update-vendor');

    fireEvent.click(getByText('Show Vendors'));
    expect(window.location.pathname).toBe('/show-vendors');

    fireEvent.click(getByText('Customer Details'));
    expect(window.location.pathname).toBe('/customers');

    fireEvent.click(getByText('Active Loans'));
    expect(window.location.pathname).toBe('/active-loans');
  });

  test('handles error fetching admin name gracefully', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(500);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for error fetching admin name
    await waitFor(() => {
      expect(screen.getByText('Welcome,')).toBeInTheDocument();
    });
  });

  test('handles error fetching vendor logos gracefully', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(500);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for error fetching vendor logos
    await waitFor(() => {
      expect(screen.getByText('Welcome, Admin')).toBeInTheDocument();
    });
  });

  test('handles no vendor logos', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, []);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for admin name and vendor logos to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Welcome, Admin')).toBeInTheDocument();
      expect(screen.queryAllByAltText(/^Vendor \d+$/).length).toBe(0);
    });
  });

  test('displays all vendor logos in the slider', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      vendors.forEach((vendor, index) => {
        expect(screen.getByAltText(`Vendor ${index + 1}`)).toBeInTheDocument();
      });
    });
  });

  test('checks responsive settings of the slider', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Our Vendors')).toBeInTheDocument();
    });

    // Check the slider settings (This requires knowledge of the internal implementation of the slider)
    // Here, we check if the settings are passed correctly to the slider component
    const slider = screen.getByText('Our Vendors').nextSibling;
    expect(slider).toHaveClass('slick-initialized');
  });

  test('displays navigation buttons and responds to click events', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, adminData);
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Add Vendor')).toBeInTheDocument();
      expect(screen.getByText('Update Vendor')).toBeInTheDocument();
      expect(screen.getByText('Show Vendors')).toBeInTheDocument();
      expect(screen.getByText('Customer Details')).toBeInTheDocument();
      expect(screen.getByText('Active Loans')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add Vendor'));
    expect(window.location.pathname).toBe('/add-vendor');

    fireEvent.click(screen.getByText('Update Vendor'));
    expect(window.location.pathname).toBe('/update-vendor');

    fireEvent.click(screen.getByText('Show Vendors'));
    expect(window.location.pathname).toBe('/show-vendors');

    fireEvent.click(screen.getByText('Customer Details'));
    expect(window.location.pathname).toBe('/customers');

    fireEvent.click(screen.getByText('Active Loans'));
    expect(window.location.pathname).toBe('/active-loans');
  });
});

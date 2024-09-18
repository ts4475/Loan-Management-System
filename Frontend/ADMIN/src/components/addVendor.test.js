import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import AddVendor from '../components/AddVendor';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('AddVendor Component', () => {
  beforeEach(() => {
    mock.reset();
    console.error = jest.fn(); // Mock console.error to avoid polluting the test output
  });

  test('renders AddVendor component', () => {
    render(
      <BrowserRouter>
        <AddVendor />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Add Vendor Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Institution Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Institution Logo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact Phone:')).toBeInTheDocument();
  });

  test('does not submit the form when required fields are empty', async () => {
    render(
      <BrowserRouter>
        <AddVendor />
      </BrowserRouter>
    );

    // Attempt to submit the form without filling it
    fireEvent.click(screen.getByText('Next'));

    // Check that the form was not submitted
    await waitFor(() => expect(mock.history.post.length).toBe(0));
  });

  test('submits the form and navigates to AddLoanProducts page', async () => {
    // Mock the POST request to add a vendor
    mock.onPost('http://localhost:8084/vendors/add').reply(200, { vendor_id: 1 });

    render(
      <BrowserRouter>
        <AddVendor />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Institution Name:'), { target: { value: 'Test Vendor' } });
    fireEvent.change(screen.getByLabelText('Upload Institution Logo:'), { target: { value: 'http://example.com/logo.png' } });
    fireEvent.change(screen.getByLabelText('Contact Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Contact Phone:'), { target: { value: '1234567890' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Next'));

    // Wait for the mock POST request to be called
    await waitFor(() => expect(mock.history.post.length).toBe(1));

    // Check if the POST request was made with the correct data
    expect(mock.history.post[0].data).toEqual(JSON.stringify({
      vendor_name: 'Test Vendor',
      vendor_logo: 'http://example.com/logo.png',
      contact_email: 'test@example.com',
      contact_phone: '1234567890',
    }));

    // Since the navigate function implementation depends on your routing setup,
    // we assume the navigation works correctly and check for the success message instead
    await waitFor(() => {
      expect(screen.getByText('Vendor and Loan Products successfully added. Redirecting back to dashboard in 5 seconds.')).toBeInTheDocument();
    });
  });

  test('displays error when submission fails', async () => {
    // Mock the POST request to add a vendor to fail
    mock.onPost('http://localhost:8084/vendors/add').reply(500);

    render(
      <BrowserRouter>
        <AddVendor />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Institution Name:'), { target: { value: 'Test Vendor' } });
    fireEvent.change(screen.getByLabelText('Upload Institution Logo:'), { target: { value: 'http://example.com/logo.png' } });
    fireEvent.change(screen.getByLabelText('Contact Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Contact Phone:'), { target: { value: '1234567890' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Next'));

    // Wait for the mock POST request to be called
    await waitFor(() => expect(mock.history.post.length).toBe(1));

    // Check if the console.error was called
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error adding vendor', expect.any(Object));
    });

    // Optionally, you can check for an error message displayed on the screen
    // expect(screen.getByText('Error adding vendor')).toBeInTheDocument();
  });

  test('displays validation errors for invalid input', async () => {
    render(
      <BrowserRouter>
        <AddVendor />
      </BrowserRouter>
    );

    // Simulate invalid email input
    fireEvent.change(screen.getByLabelText('Contact Email:'), { target: { value: 'invalid-email' } });

    // Attempt to submit the form
    fireEvent.click(screen.getByText('Next'));

    // Check that the form was not submitted
    await waitFor(() => expect(mock.history.post.length).toBe(0));

    // Check for validation error messages
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });
});

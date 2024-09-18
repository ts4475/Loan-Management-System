import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import MyAccount from '../components/MyAccount';
import { act } from 'react-dom/test-utils';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('MyAccount Component', () => {
  const userData = {
    first_name: 'John',
    last_name: 'Doe',
    dob: '01-01-1990',
    pan: 'ABCDE1234F',
    address: '123 Street',
    pin: '123456',
    email: 'john.doe@example.com',
    phone: '1234567890'
  };

  beforeEach(() => {
    mock.reset();
    localStorage.setItem('user_id', '1');
    mock.onGet('http://localhost:8082/users/readOne/1').reply(200, userData);
  });

  test('renders MyAccount component and fetches user data', async () => {
    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Fill in Your Personal Details')).toBeInTheDocument();

    // Wait for user data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('01-01-1990')).toBeInTheDocument();
      expect(screen.getByDisplayValue('ABCDE1234F')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123 Street')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    });
  });

  test('handles profile update', async () => {
    mock.onPut('http://localhost:8082/users/update/1').reply(200);

    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Enable editing address and change value
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }).closest('button'));
    fireEvent.change(screen.getByDisplayValue('123 Street'), { target: { value: '456 Avenue' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    // Check if the PUT request was made
    await waitFor(() => {
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].data).toEqual(JSON.stringify({
        ...userData,
        address: '456 Avenue',
        pin: '123456',
        email: 'john.doe@example.com',
        phone: '1234567890'
      }));
    });

    // Check for success alert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Profile updated successfully');
    });
  });

  test('handles password change', async () => {
    mock.onPost('http://localhost:8082/users/login').reply(200, { status: 200 });
    mock.onPut('http://localhost:8082/users/update/1').reply(200);

    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Change password
    fireEvent.change(screen.getByLabelText('Current Password:'), { target: { value: 'currentPassword' } });
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password:'), { target: { value: 'newPassword' } });

    // Save new password
    fireEvent.click(screen.getByText('Save Password'));

    // Check if the POST and PUT requests were made
    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.post[0].data).toEqual(JSON.stringify({
        email: 'john.doe@example.com',
        password: 'currentPassword',
      }));
      expect(mock.history.put[0].data).toEqual(JSON.stringify({
        ...userData,
        password: 'newPassword',
      }));
    });

    // Check for success alert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Password updated successfully');
    });
  });

  test('handles password mismatch', async () => {
    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Change password with mismatch
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password:'), { target: { value: 'differentPassword' } });

    // Save new password
    fireEvent.click(screen.getByText('Save Password'));

    // Check for password mismatch alert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('New passwords do not match');
    });
  });

  test('handles current password incorrect', async () => {
    mock.onPost('http://localhost:8082/users/login').reply(400);

    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Change password
    fireEvent.change(screen.getByLabelText('Current Password:'), { target: { value: 'wrongPassword' } });
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: 'newPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password:'), { target: { value: 'newPassword' } });

    // Save new password
    fireEvent.click(screen.getByText('Save Password'));

    // Check for incorrect current password message
    await waitFor(() => {
      expect(screen.getByText('Current password is incorrect')).toBeInTheDocument();
    });
  });

  test('calculates password strength', async () => {
    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Change password to weak
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: '123' } });
    await waitFor(() => {
      expect(screen.getByText('Password strength: Weak')).toBeInTheDocument();
    });

    // Change password to moderate
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: '1234567' } });
    await waitFor(() => {
      expect(screen.getByText('Password strength: Moderate')).toBeInTheDocument();
    });

    // Change password to strong
    fireEvent.change(screen.getByLabelText('New Password:'), { target: { value: '1234567890' } });
    await waitFor(() => {
      expect(screen.getByText('Password strength: Strong')).toBeInTheDocument();
    });
  });

  test('enables editing fields', async () => {
    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Enable editing address
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }).closest('button'));
    expect(screen.getByDisplayValue('123 Street')).toHaveAttribute('readOnly', '');
    expect(screen.getByDisplayValue('123 Street')).toHaveClass('bg-white');

    // Enable editing pin
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }).closest('button'));
    expect(screen.getByDisplayValue('123456')).toHaveAttribute('readOnly', '');
    expect(screen.getByDisplayValue('123456')).toHaveClass('bg-white');

    // Enable editing email
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }).closest('button'));
    expect(screen.getByDisplayValue('john.doe@example.com')).toHaveAttribute('readOnly', '');
    expect(screen.getByDisplayValue('john.doe@example.com')).toHaveClass('bg-white');

    // Enable editing phone
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }).closest('button'));
    expect(screen.getByDisplayValue('1234567890')).toHaveAttribute('readOnly', '');
    expect(screen.getByDisplayValue('1234567890')).toHaveClass('bg-white');
  });

  test('displays error when failing to fetch user data', async () => {
    mock.onGet('http://localhost:8082/users/readOne/1').reply(500);

    render(
      <BrowserRouter>
        <MyAccount />
      </BrowserRouter>
    );

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching user data', expect.any(Error));
    });
  });
});

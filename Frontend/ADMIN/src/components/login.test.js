import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('Login Component', () => {
  beforeEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('redirects to dashboard if user is already logged in', () => {
    localStorage.setItem('user_id', '1');
    const navigate = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });

  test('renders Login component and handles login', async () => {
    const user = { user_id: '1', role: 'ADMIN' };
    mock.onPost('http://localhost:8082/users/admin-login').reply(200, user);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Hey Admin!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your password')).toBeInTheDocument();

    // Simulate email and password input
    fireEvent.change(screen.getByPlaceholderText('Type your email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Type your password'), { target: { value: 'password' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for the login process and check if redirected to dashboard
    await waitFor(() => {
      expect(localStorage.getItem('user_id')).toBe('1');
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  test('shows alert for unauthorized user', async () => {
    const user = { user_id: '2', role: 'USER' }; // Non-admin role
    mock.onPost('http://localhost:8082/users/admin-login').reply(200, user);
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate email and password input
    fireEvent.change(screen.getByPlaceholderText('Type your email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Type your password'), { target: { value: 'password' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for the login process and check if alert is shown
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('You are not authorized to access this page.');
    });
  });

  test('shows alert for invalid login credentials', async () => {
    mock.onPost('http://localhost:8082/users/admin-login').reply(400);
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate email and password input
    fireEvent.change(screen.getByPlaceholderText('Type your email'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Type your password'), { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for the login process and check if alert is shown
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid email or password.');
    });
  });
});

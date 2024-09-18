import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faUser, faLifeRing, faBars } from '@fortawesome/free-solid-svg-icons';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AdminNavbar Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders AdminNavbar component correctly', () => {
    render(
      <BrowserRouter>
        <AdminNavbar />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Capital Nest')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('navigates to /dashboard when Home is clicked', () => {
    render(
      <BrowserRouter>
        <AdminNavbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('navigates to /support when Support is clicked', () => {
    render(
      <BrowserRouter>
        <AdminNavbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Support'));
    expect(mockNavigate).toHaveBeenCalledWith('/support');
  });

  test('navigates to /myaccount when Profile is clicked', () => {
    render(
      <BrowserRouter>
        <AdminNavbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Profile'));
    expect(mockNavigate).toHaveBeenCalledWith('/myaccount');
  });

  test('logs out and navigates to / when Log out is clicked', () => {
    render(
      <BrowserRouter>
        <AdminNavbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Log out'));
    expect(localStorage.getItem('user_id')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

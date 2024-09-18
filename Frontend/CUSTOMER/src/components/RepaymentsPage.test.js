import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RepaymentsPage from './RepaymentsPage';
import { UserContext } from '../context/UserContext';  // Adjust the path as necessary

// Mock the axios instance
const mockAxios = new axiosMock(axios);

// Mock UserContext
const mockUser = { userId: 1, name: 'Test User' };
const mockLogout = jest.fn();

const MockUserProvider = ({ children }) => (
  <UserContext.Provider value={{ user: mockUser, setUser: jest.fn(), logout: mockLogout }}>
    {children}
  </UserContext.Provider>
);

describe('RepaymentsPage', () => {
  const loanId = '1';
  const repayments = [
    { id: 1, amount: 1000, repaymentDate: '2023-01-01', status: 'COMPLETED' },
    { id: 2, amount: 500, repaymentDate: '2023-02-01', status: 'PENDING' },
  ];

  beforeEach(() => {
    mockAxios.reset();
  });

  test('renders RepaymentsPage and fetches repayments', async () => {
    // Mocking the axios GET request
    mockAxios.onGet(`http://localhost:9191/api/repayments/loan/${loanId}`).reply(200, repayments);

    // Render the component with the MemoryRouter and Routes
    render(
      <MockUserProvider>
        <MemoryRouter initialEntries={[`/repayments/${loanId}`]}>
          <Routes>
            <Route path="/repayments/:loanId" element={<RepaymentsPage />} />
          </Routes>
        </MemoryRouter>
      </MockUserProvider>
    );

    // Check if the header is rendered
    expect(screen.getByText(`Repayments for Loan ID: ${loanId}`)).toBeInTheDocument();

    // Wait for the repayments to be loaded and check if they are displayed correctly
    await waitFor(() => {
      expect(screen.getByText('Repayment ID')).toBeInTheDocument();
      expect(screen.getByText('Amount')).toBeInTheDocument();
      expect(screen.getByText('Repayment Date')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
      expect(screen.getByText('COMPLETED')).toBeInTheDocument();

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('2023-02-01')).toBeInTheDocument();
      expect(screen.getByText('PENDING')).toBeInTheDocument();
    });
  });

  test('handles no repayments available', async () => {
    // Mocking the axios GET request to return an empty array
    mockAxios.onGet(`http://localhost:9191/api/repayments/loan/${loanId}`).reply(200, []);

    // Render the component with the MemoryRouter and Routes
    render(
      <MockUserProvider>
        <MemoryRouter initialEntries={[`/repayments/${loanId}`]}>
          <Routes>
            <Route path="/repayments/:loanId" element={<RepaymentsPage />} />
          </Routes>
        </MemoryRouter>
      </MockUserProvider>
    );

    // Wait for the message to be displayed
    await waitFor(() => {
      expect(screen.getByText('No Repayments Available')).toBeInTheDocument();
    });
  });

  test('handles PDF generation', async () => {
    // Mocking the axios GET request
    mockAxios.onGet(`http://localhost:9191/api/repayments/loan/${loanId}`).reply(200, repayments);

    // Render the component with the MemoryRouter and Routes
    render(
      <MockUserProvider>
        <MemoryRouter initialEntries={[`/repayments/${loanId}`]}>
          <Routes>
            <Route path="/repayments/:loanId" element={<RepaymentsPage />} />
          </Routes>
        </MemoryRouter>
      </MockUserProvider>
    );

    // Wait for the repayments to be loaded
    await waitFor(() => {
      expect(screen.getByText('Repayment ID')).toBeInTheDocument();
    });

    // Simulate clicking the "Download Repayments" button
    const generatePDFButton = screen.getByText('Download Repayments');
    fireEvent.click(generatePDFButton);

    // Note: Testing PDF generation directly is complex and might require additional setup or libraries to validate PDF generation.
    // For simplicity, we assume the PDF generation function is called correctly.
  });
});

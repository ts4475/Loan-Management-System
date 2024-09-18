// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import TransactionsPage from './TransactionsPage';

// jest.mock('axios');

// describe('TransactionsPage', () => {
//     const loanId = '1';
//     const transactions = [
//         { id: 1, amount: 1000, type: 'Credit', transactionDate: '2023-01-01' },
//         { id: 2, amount: 500, type: 'Debit', transactionDate: '2023-02-01' },
//     ];

//     beforeEach(() => {
//         axios.get.mockResolvedValue({ data: transactions });
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('renders TransactionsPage and fetches transactions', async () => {
//         render(
//             <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
//                 <Routes>
//                     <Route path="/transactions/:loanId" element={<TransactionsPage />} />
//                 </Routes>
//             </MemoryRouter>
//         );

//         expect(screen.getByText(`Transactions for Loan ID: ${loanId}`)).toBeInTheDocument();

//         await waitFor(() => {
//             expect(screen.getByText('Transaction ID')).toBeInTheDocument();
//             expect(screen.getByText('Amount')).toBeInTheDocument();
//             expect(screen.getByText('Type')).toBeInTheDocument();
//             expect(screen.getByText('Transaction Date')).toBeInTheDocument();
//         });

//         expect(screen.getByText('1')).toBeInTheDocument();
//         expect(screen.getByText('1000')).toBeInTheDocument();
//         expect(screen.getByText('Credit')).toBeInTheDocument();
//         expect(screen.getByText('2023-01-01')).toBeInTheDocument();

//         expect(screen.getByText('2')).toBeInTheDocument();
//         expect(screen.getByText('500')).toBeInTheDocument();
//         expect(screen.getByText('Debit')).toBeInTheDocument();
//         expect(screen.getByText('2023-02-01')).toBeInTheDocument();
//     });

//     test('handles no transactions available', async () => {
//         axios.get.mockResolvedValueOnce({ data: [] });

//         render(
//             <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
//                 <Routes>
//                     <Route path="/transactions/:loanId" element={<TransactionsPage />} />
//                 </Routes>
//             </MemoryRouter>
//         );

//         await waitFor(() => {
//             expect(screen.getByText('No Transactions Available')).toBeInTheDocument();
//         });
//     });

//     test('handles filters and search', async () => {
//         render(
//             <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
//                 <Routes>
//                     <Route path="/transactions/:loanId" element={<TransactionsPage />} />
//                 </Routes>
//             </MemoryRouter>
//         );

//         await waitFor(() => {
//             expect(screen.getByText('Transaction ID')).toBeInTheDocument();
//         });

//         const searchInput = screen.getByLabelText(/Search:/i);
//         fireEvent.change(searchInput, { target: { value: 'Credit' } });

//         await waitFor(() => {
//             expect(screen.getByText('1')).toBeInTheDocument();
//             expect(screen.queryByText('2')).not.toBeInTheDocument();
//         });

//         fireEvent.change(searchInput, { target: { value: '500' } });

//         await waitFor(() => {
//             expect(screen.getByText('2')).toBeInTheDocument();
//             expect(screen.queryByText('1')).not.toBeInTheDocument();
//         });
//     });

//     test('handles PDF generation', async () => {
//         render(
//             <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
//                 <Routes>
//                     <Route path="/transactions/:loanId" element={<TransactionsPage />} />
//                 </Routes>
//             </MemoryRouter>
//         );

//         await waitFor(() => {
//             expect(screen.getByText('Transaction ID')).toBeInTheDocument();
//         });

//         const generatePDFButton = screen.getByText('Download Transactions');
//         fireEvent.click(generatePDFButton);

//         // Mock jsPDF and autoTable functionality
//         const jsPDFMock = jest.fn().mockImplementation(() => ({
//             text: jest.fn(),
//             autoTable: jest.fn(),
//             save: jest.fn(),
//         }));

//         const originalJsPDF = window.jsPDF;
//         window.jsPDF = jsPDFMock;

//         fireEvent.click(generatePDFButton);

//         expect(jsPDFMock).toHaveBeenCalled();
//         expect(jsPDFMock().text).toHaveBeenCalledWith(`Transactions for Loan ID: ${loanId}`, 10, 10);
//         expect(jsPDFMock().autoTable).toHaveBeenCalled();
//         expect(jsPDFMock().save).toHaveBeenCalledWith(`transactions_loan_${loanId}.pdf`);

//         window.jsPDF = originalJsPDF;  // Restore original jsPDF
//     });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TransactionsPage from './TransactionsPage';
import { jsPDF } from 'jspdf';

jest.mock('axios');
jest.mock('jspdf');

describe('TransactionsPage', () => {
  const loanId = '1';
  const transactions = [
    { id: 1, amount: 1000, type: 'Credit', transactionDate: '2023-01-01' },
    { id: 2, amount: 500, type: 'Debit', transactionDate: '2023-02-01' },
  ];

  let jsPDFMock;

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: transactions });

    jsPDFMock = {
      text: jest.fn(),
      autoTable: jest.fn(),
      save: jest.fn()
    };

    jsPDF.mockImplementation(() => jsPDFMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders TransactionsPage and fetches transactions', async () => {
    render(
      <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
        <Routes>
          <Route path="/transactions/:loanId" element={<TransactionsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(`Transactions for Loan ID: ${loanId}`)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('Amount')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Transaction Date')).toBeInTheDocument();
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Debit')).toBeInTheDocument();
    expect(screen.getByText('2023-02-01')).toBeInTheDocument();
  });

  test('handles no transactions available', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
        <Routes>
          <Route path="/transactions/:loanId" element={<TransactionsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Transactions Available')).toBeInTheDocument();
    });
  });

  test('handles filters and search', async () => {
    render(
      <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
        <Routes>
          <Route path="/transactions/:loanId" element={<TransactionsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/Search:/i);
    fireEvent.change(searchInput, { target: { value: 'Credit' } });

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.queryByText('2')).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '500' } });

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });
  });

  test('handles PDF generation', async () => {
    render(
      <MemoryRouter initialEntries={[`/transactions/${loanId}`]}>
        <Routes>
          <Route path="/transactions/:loanId" element={<TransactionsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    });

    const generatePDFButton = screen.getByText('Download Transactions');
    fireEvent.click(generatePDFButton);

    await waitFor(() => {
      expect(jsPDFMock.text).toHaveBeenCalledWith(`Transactions for Loan ID: ${loanId}`, 10, 10);
      expect(jsPDFMock.autoTable).toHaveBeenCalled();
      expect(jsPDFMock.save).toHaveBeenCalledWith(`transactions_loan_${loanId}.pdf`);
    });
  });
});

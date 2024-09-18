import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClosedLoans from './ClosedLoans';

const paidOffLoans = [
    {
        id: 1,
        amount: 1000,
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        interestRate: 5,
        repayableAmount: 1050,
        manager: { first_name: 'John', last_name: 'Doe' },
        vendor: { vendor_name: 'Vendor A' },
        totalRepaymentAmount: 1100,
    },
    {
        id: 2,
        amount: 2000,
        startDate: '2023-02-01',
        endDate: '2023-11-30',
        interestRate: 6,
        repayableAmount: 2120,
        manager: { first_name: 'Jane', last_name: 'Smith' },
        vendor: { vendor_name: 'Vendor B' },
        totalRepaymentAmount: 2200,
    },
];

const filtersPaidOff = {
    startDate: '',
    endDate: '',
    loanManager: '',
    vendor: '',
};

const handleFilterChange = jest.fn();
const handleViewTransactions = jest.fn();

describe('ClosedLoans Component', () => {
    beforeEach(() => {
        render(
            <ClosedLoans
                paidOffLoans={paidOffLoans}
                filtersPaidOff={filtersPaidOff}
                handleFilterChange={handleFilterChange}
                handleViewTransactions={handleViewTransactions}
            />
        );
    });

    test('renders ClosedLoans component correctly', () => {
        expect(screen.getByText('Your Paid Off Loans')).toBeTruthy();
        expect(screen.getByText('Start Date:')).toBeTruthy();
        expect(screen.getByText('End Date:')).toBeTruthy();
        expect(screen.getByText('Loan Manager:')).toBeTruthy();
        expect(screen.getByText('Vendor:')).toBeTruthy();
    });

    test('displays paid off loans correctly', () => {
        expect(screen.getByText('1')).toBeTruthy();
        expect(screen.getByText('1000')).toBeTruthy();
        expect(screen.getByText('John Doe')).toBeTruthy();
        expect(screen.getByText('Vendor A')).toBeTruthy();

        expect(screen.getByText('2')).toBeTruthy();
        expect(screen.getByText('2000')).toBeTruthy();
        expect(screen.getByText('Jane Smith')).toBeTruthy();
        expect(screen.getByText('Vendor B')).toBeTruthy();
    });

    test('filters loans based on input', () => {
        const startDateInput = screen.getByLabelText('Start Date:');
        const loanManagerInput = screen.getByLabelText('Loan Manager:');

        fireEvent.change(startDateInput, { target: { value: '2023-02-01' } });
        fireEvent.change(loanManagerInput, { target: { value: 'Jane' } });

        expect(handleFilterChange).toHaveBeenCalledTimes(2);
    });

    test('displays no paid off loans message when there are no loans', () => {
        render(
            <ClosedLoans
                paidOffLoans={[]}
                filtersPaidOff={filtersPaidOff}
                handleFilterChange={handleFilterChange}
                handleViewTransactions={handleViewTransactions}
            />
        );

        expect(screen.getByText('No Paid Off Loans')).toBeTruthy();
    });

    test('calls the correct functions on button clicks', () => {
        const viewTransactionsButtons = screen.getAllByText('View Transactions');
        fireEvent.click(viewTransactionsButtons[0]);
        expect(handleViewTransactions).toHaveBeenCalledWith(1);
    });

    test('paginates correctly', () => {
        const paginate = jest.fn();
        const setCurrentPagePaidOff = jest.fn();

        render(
            <ClosedLoans
                paidOffLoans={paidOffLoans}
                filtersPaidOff={filtersPaidOff}
                handleFilterChange={handleFilterChange}
                handleViewTransactions={handleViewTransactions}
            />
        );

        const nextPageButton = screen.getByText('2');
        fireEvent.click(nextPageButton);
        expect(setCurrentPagePaidOff).toHaveBeenCalledWith(2);
    });
});

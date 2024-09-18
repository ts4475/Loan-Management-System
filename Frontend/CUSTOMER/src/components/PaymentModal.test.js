import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PaymentModal from './PaymentModal';

jest.mock('axios');

const mockLoan = {
    id: 1,
    emiamount: 1000,
    lateFee: 50,
    prePaymentFee: 20,
    repayments: [
        { repaymentDate: '2023-01-01' },
        { repaymentDate: '2023-02-01' },
    ],
};

describe('PaymentModal', () => {
    const onClose = jest.fn();

    beforeEach(() => {
        render(<PaymentModal loan={mockLoan} onClose={onClose} />);
    });

    test('renders PaymentModal component correctly', () => {
        expect(screen.getByText('Pay EMI for Loan ID: 1')).toBeInTheDocument();
        expect(screen.getByText('EMI Amount: 1000')).toBeInTheDocument();
        expect(screen.getByText('Late Fee: 50')).toBeInTheDocument();
        expect(screen.getByText('Prepayment Fee: 20')).toBeInTheDocument();
    });

    test('handles payment option selection', () => {
        const paymentSelect = screen.getByLabelText('Payment Option:');
        fireEvent.change(paymentSelect, { target: { value: 'bank' } });
        expect(screen.getByText('Bank Transfer')).toBeInTheDocument();

        fireEvent.change(paymentSelect, { target: { value: 'card' } });
        expect(screen.getByText('Card Payment')).toBeInTheDocument();

        fireEvent.change(paymentSelect, { target: { value: 'upi' } });
        expect(screen.getByText('UPI Payment')).toBeInTheDocument();
    });

    test('handles form validation for bank payment option', async () => {
        const paymentSelect = screen.getByLabelText('Payment Option:');
        fireEvent.change(paymentSelect, { target: { value: 'bank' } });

        const newBankRadio = screen.getByLabelText('New Bank Account');
        fireEvent.click(newBankRadio);

        const accountNumberInput = screen.getByLabelText('Bank Account Number:');
        fireEvent.change(accountNumberInput, { target: { value: '1234567890' } });
        expect(accountNumberInput.value).toBe('1234567890');

        const bankNameInput = screen.getByLabelText('Bank Name:');
        fireEvent.change(bankNameInput, { target: { value: 'Test Bank' } });
        expect(bankNameInput.value).toBe('Test Bank');

        const ifscCodeInput = screen.getByLabelText('IFSC Code:');
        fireEvent.change(ifscCodeInput, { target: { value: 'TEST0001' } });
        expect(ifscCodeInput.value).toBe('TEST0001');

        const payButton = screen.getByText('Pay');
        expect(payButton).toBeEnabled();

        fireEvent.click(payButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:9191/api/repayments/1', {
                lateFee: 50,
                prePaymentFee: 20,
            });
            expect(screen.getByText('Payment Successful')).toBeInTheDocument();
        });
    });

    test('handles form validation for card payment option', async () => {
        const paymentSelect = screen.getByLabelText('Payment Option:');
        fireEvent.change(paymentSelect, { target: { value: 'card' } });

        const cardNumberInput = screen.getByLabelText('Card Number:');
        fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });
        expect(cardNumberInput.value).toBe('4111111111111111');

        const expiryInput = screen.getByLabelText('Expiry Date:');
        fireEvent.change(expiryInput, { target: { value: '12/25' } });
        expect(expiryInput.value).toBe('12/25');

        const cardNameInput = screen.getByLabelText('Cardholder Name:');
        fireEvent.change(cardNameInput, { target: { value: 'John Doe' } });
        expect(cardNameInput.value).toBe('John Doe');

        const cvvInput = screen.getByLabelText('CVV:');
        fireEvent.change(cvvInput, { target: { value: '123' } });
        expect(cvvInput.value).toBe('123');

        const payButton = screen.getByText('Pay');
        expect(payButton).toBeEnabled();

        fireEvent.click(payButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:9191/api/repayments/1', {
                lateFee: 50,
                prePaymentFee: 20,
            });
            expect(screen.getByText('Payment Successful')).toBeInTheDocument();
        });
    });

    test('handles form validation for UPI payment option', async () => {
        const paymentSelect = screen.getByLabelText('Payment Option:');
        fireEvent.change(paymentSelect, { target: { value: 'upi' } });

        const upiIdInput = screen.getByLabelText('UPI ID:');
        fireEvent.change(upiIdInput, { target: { value: 'test@upi' } });
        expect(upiIdInput.value).toBe('test@upi');

        const payButton = screen.getByText('Pay');
        expect(payButton).toBeEnabled();

        fireEvent.click(payButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:9191/api/repayments/1', {
                lateFee: 50,
                prePaymentFee: 20,
            });
            expect(screen.getByText('Payment Successful')).toBeInTheDocument();
        });
    });

    test('handles closing the modal', () => {
        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });
});

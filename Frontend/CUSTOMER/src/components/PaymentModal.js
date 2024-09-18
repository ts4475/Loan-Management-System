import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentModal = ({ loan, onClose }) => {
    const [paymentOption, setPaymentOption] = useState('');
    const [bankDetails, setBankDetails] = useState({});
    const [cardDetails, setCardDetails] = useState({});
    const [upiId, setUpiId] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [lateFee, setLateFee] = useState(loan.lateFee);
    const [prePaymentFee, setPrePaymentFee] = useState(loan.prePaymentFee);
    const [monthlyPayments, setMonthlyPayments] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const isBeforeTenth = currentDate.getDate() <= 10;

        const paymentsInMonth = loan.repayments.filter(repayment => {
            const repaymentDate = new Date(repayment.repaymentDate);
            return repaymentDate.getMonth() === currentDate.getMonth() && repaymentDate.getFullYear() === currentDate.getFullYear();
        }).length;

        setMonthlyPayments(paymentsInMonth);

        if (isBeforeTenth) {
            setLateFee(0);
        }

        if (paymentsInMonth === 0) {
            setPrePaymentFee(0);
        } else if (paymentsInMonth > 0) {
            setPrePaymentFee(loan.prePaymentFee);
        }
    }, [loan]);

    useEffect(() => {
        const validateForm = () => {
            if (paymentOption === 'bank') {
                if (bankDetails.type === 'new') {
                    return bankDetails.accountNumber && bankDetails.bankName && bankDetails.ifscCode;
                } else if (bankDetails.type === 'existing') {
                    return true;
                }
            } else if (paymentOption === 'card') {
                return cardDetails.number && cardDetails.expiry && cardDetails.name && cardDetails.cvv;
            } else if (paymentOption === 'upi') {
                return upiId;
            }
            return false;
        };
        setIsFormValid(validateForm());
    }, [paymentOption, bankDetails, cardDetails, upiId]);

    const handlePayment = () => {
        const paymentDetails = {
            lateFee,
            prePaymentFee,
        };

        if (paymentOption === 'bank') {
        } else if (paymentOption === 'card') {
        } else if (paymentOption === 'upi') {
        }

        axios.post(`http://localhost:9191/api/repayments/${loan.id}`, paymentDetails)
            .then(response => {
                setPaymentSuccess(true);
            })
            .catch(error => {
                console.error('Payment failed!', error);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <span className="absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
                {paymentSuccess ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Payment Successful</h2>
                        <p className="mb-4">Your payment has been processed successfully.</p>
                        <button onClick={onClose} className="bg-[#5F7A61] text-white py-2 px-4 rounded">Close</button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Pay EMI for Loan ID: {loan.id}</h2>
                        <p className="mb-2"><span className="font-semibold">EMI Amount:</span> {loan.emiamount}</p>
                        <p className="mb-2"><span className="font-semibold">Late Fee:</span> {lateFee}</p>
                        <p className="mb-2"><span className="font-semibold">Prepayment Fee:</span> {prePaymentFee}</p>
                        <label className="block mb-2">
                            <span className="text-gray-700">Payment Option:</span>
                            <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Select...</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="card">Debit/Credit Card</option>
                                <option value="upi">UPI</option>
                            </select>
                        </label>
                        {paymentOption === 'bank' && (
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-[#5F7A61]">Bank Transfer</h3>
                                <label className="block mb-2">
                                    <input type="radio" name="bank" value="new" onChange={(e) => setBankDetails({ ...bankDetails, type: 'new' })} className="mr-2" /> New Bank Account
                                </label>
                                <label className="block mb-2">
                                    <input type="radio" name="bank" value="existing" onChange={(e) => setBankDetails({ ...bankDetails, type: 'existing' })} className="mr-2" /> Existing Bank Account
                                </label>
                                {bankDetails.type === 'new' && (
                                    <div>
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Bank Account Number:</span>
                                            <input type="text" onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                        </label>
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Bank Name:</span>
                                            <input type="text" onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                        </label>
                                        <label className="block mb-2">
                                            <span className="text-gray-700">IFSC Code:</span>
                                            <input type="text" onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}
                        {paymentOption === 'card' && (
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-[#5F7A61]">Card Payment</h3>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Card Number:</span>
                                    <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </label>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Expiry Date:</span>
                                    <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </label>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Cardholder Name:</span>
                                    <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </label>
                                <label className="block mb-2">
                                    <span className="text-gray-700">CVV:</span>
                                    <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </label>
                            </div>
                        )}
                        {paymentOption === 'upi' && (
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-[#5F7A61]">UPI Payment</h3>
                                <label className="block mb-2">
                                    <span className="text-gray-700">UPI ID:</span>
                                    <input type="text" onChange={(e) => setUpiId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </label>
                            </div>
                        )}
                        <button onClick={handlePayment} disabled={!isFormValid} className={`w-full py-2 px-4 rounded mt-4 font-semibold text-white ${isFormValid ? 'bg-[#5F7A61] hover:bg-[#4e6751]' : 'bg-gray-400 cursor-not-allowed'}`}>Pay</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;

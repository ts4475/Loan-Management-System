import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TransactionsPage = () => {
    const { loanId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        type: '',
    });
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:9191/api/transactions/loan/${loanId}`)
            .then(response => {
                setTransactions(response.data);
                setFilteredTransactions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the transactions!', error);
            });
    }, [loanId]);

    useEffect(() => {
        filterTransactions();
    }, [filters, search, transactions]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filterTransactions = () => {
        let filtered = transactions;

        if (filters.startDate) {
            filtered = filtered.filter(transaction => new Date(transaction.transactionDate) >= new Date(filters.startDate));
        }

        if (filters.endDate) {
            filtered = filtered.filter(transaction => new Date(transaction.transactionDate) <= new Date(filters.endDate));
        }

        if (filters.type) {
            filtered = filtered.filter(transaction => transaction.type.toLowerCase().includes(filters.type.toLowerCase()));
        }

        if (search) {
            filtered = filtered.filter(transaction =>
                transaction.id.toString().includes(search) ||
                transaction.amount.toString().includes(search) ||
                transaction.type.toLowerCase().includes(search.toLowerCase()) ||
                transaction.transactionDate.includes(search)
            );
        }

        setFilteredTransactions(filtered);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Transactions for Loan ID: ${loanId}`, 10, 10);

        const headers = ['Transaction ID', 'Amount', 'Type', 'Transaction Date'];

        const rows = filteredTransactions.map(item => [
            item.id,
            item.amount,
            item.type,
            item.transactionDate
        ]);

        doc.autoTable({
            startY: 20,
            head: [headers],
            body: rows,
        });

        doc.save(`transactions_loan_${loanId}.pdf`);
    };

    return (
        <div className="p-6 bg-[#E7EEE1] min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Transactions for Loan ID: {loanId}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 mb-4">
                    <label className="block">
                        <span className="text-gray-700">Start Date:</span>
                        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">End Date:</span>
                        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Type:</span>
                        <input type="text" name="type" value={filters.type} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Search:</span>
                        <input type="text" value={search} onChange={handleSearchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                </div>
            </div>
            {filteredTransactions.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <button onClick={generatePDF} className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-4">Download Transactions</button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-[#5F7A61] text-white">
                                <tr className="flex w-full">
                                    <th className="flex-1 px-4 py-2">Transaction ID</th>
                                    <th className="flex-1 px-4 py-2">Amount</th>
                                    <th className="flex-1 px-4 py-2">Type</th>
                                    <th className="flex-1 px-4 py-2">Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {filteredTransactions.map(transaction => (
                                    <tr key={transaction.id} className="flex w-full border-b last:border-none hover:bg-gray-100">
                                        <td className="flex-1 px-4 py-2">{transaction.id}</td>
                                        <td className="flex-1 px-4 py-2">{transaction.amount}</td>
                                        <td className="flex-1 px-4 py-2">{transaction.type}</td>
                                        <td className="flex-1 px-4 py-2">{transaction.transactionDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">No Transactions Available</p>
            )}
        </div>
    );
};

export default TransactionsPage;

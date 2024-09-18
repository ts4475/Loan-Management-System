import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const ClosedLoans = ({
    paidOffLoans,
    filtersPaidOff,
    handleFilterChange,
    handleViewTransactions
}) => {
    const [filteredPaidOffLoans, setFilteredPaidOffLoans] = useState([]);
    const [currentPagePaidOff, setCurrentPagePaidOff] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        filterPaidOffLoans();
    }, [filtersPaidOff, paidOffLoans]);

    const filterPaidOffLoans = () => {
        const filteredPaidOff = paidOffLoans.filter(loan => {
            const matchesStartDate = filtersPaidOff.startDate ? new Date(loan.startDate) >= new Date(filtersPaidOff.startDate) : true;
            const matchesEndDate = filtersPaidOff.endDate ? new Date(loan.endDate) <= new Date(filtersPaidOff.endDate) : true;
            const matchesManager = filtersPaidOff.loanManager ? (loan.manager.first_name + ' ' + loan.manager.last_name).toLowerCase().includes(filtersPaidOff.loanManager.toLowerCase()) : true;
            const matchesVendor = filtersPaidOff.vendor ? loan.vendor.vendor_name.toLowerCase().includes(filtersPaidOff.vendor.toLowerCase()) : true;
            return matchesStartDate && matchesEndDate && matchesManager && matchesVendor;
        });
        setFilteredPaidOffLoans(filteredPaidOff);
    };

    const paginate = (items, pageNumber, itemsPerPage) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const paidOffLoansPage = paginate(filteredPaidOffLoans, currentPagePaidOff, itemsPerPage);

    return (
        <div style={{ marginTop: '40px' }}>
            <h2 className="text-2xl font-bold mb-4">Your Paid Off Loans</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Start Date:</label>
                <input type="date" name="startDate" value={filtersPaidOff.startDate} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">End Date:</label>
                <input type="date" name="endDate" value={filtersPaidOff.endDate} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Loan Manager:</label>
                <input type="text" name="loanManager" value={filtersPaidOff.loanManager} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Vendor:</label>
                <input type="text" name="vendor" value={filtersPaidOff.vendor} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            {filteredPaidOffLoans.length > 0 ? (
                <>
                    <table className="min-w-full bg-white">
                        <thead className="bg-[#5F7A61] text-white">
                            <tr>
                                <th className="px-2 py-2 w-1/12">Loan ID</th>
                                <th className="px-2 py-2 w-1/12">Amount</th>
                                <th className="px-2 py-2 w-1/12">Start Date</th>
                                <th className="px-2 py-2 w-1/12">End Date</th>
                                <th className="px-2 py-2 w-1/12">Interest Rate</th>
                                <th className="px-2 py-2 w-1/12">Repayable Amount</th>
                                <th className="px-2 py-2 w-1/12">Manager</th>
                                <th className="px-2 py-2 w-1/12">Vendor</th>
                                <th className="px-2 py-2 w-1/12">Total Repayment Amount</th>
                                <th className="px-2 py-2 w-2/12">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paidOffLoansPage.map(loan => (
                                <tr key={loan.id} className="border-b last:border-none hover:bg-gray-100">
                                    <td className="px-2 py-2">{loan.id}</td>
                                    <td className="px-2 py-2">{loan.amount}</td>
                                    <td className="px-2 py-2">{loan.startDate}</td>
                                    <td className="px-2 py-2">{loan.endDate}</td>
                                    <td className="px-2 py-2">{loan.interestRate}%</td>
                                    <td className="px-2 py-2">{loan.repayableAmount}</td>
                                    <td className="px-2 py-2">{loan.manager.first_name} {loan.manager.last_name}</td>
                                    <td className="px-2 py-2">{loan.vendor.vendor_name}</td>
                                    <td className="px-2 py-2">{loan.totalRepaymentAmount}</td>
                                    <td className="px-2 py-2">
                                        <button onClick={() => handleViewTransactions(loan.id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">View Transactions</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredPaidOffLoans.length}
                        paginate={setCurrentPagePaidOff}
                        currentPage={currentPagePaidOff}
                    />
                </>
            ) : (
                <p className="text-gray-600">No Paid Off Loans</p>
            )}
        </div>
    );
};

export default ClosedLoans;

import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const ActiveLoans = ({
    activeLoans,
    filtersActive,
    handleFilterChange,
    handleViewTransactions,
    handlePayEMI,
    handleRaiseQuery,
    handleViewRepayments
}) => {
    const [filteredActiveLoans, setFilteredActiveLoans] = useState([]);
    const [currentPageActive, setCurrentPageActive] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        filterActiveLoans();
    }, [filtersActive, activeLoans]);

    const filterActiveLoans = () => {
        const filteredActive = activeLoans.filter(loan => {
            const matchesStartDate = filtersActive.startDate ? new Date(loan.startDate) >= new Date(filtersActive.startDate) : true;
            const matchesEndDate = filtersActive.endDate ? new Date(loan.endDate) <= new Date(filtersActive.endDate) : true;
            const matchesManager = filtersActive.loanManager ? (loan.manager.first_name + ' ' + loan.manager.last_name).toLowerCase().includes(filtersActive.loanManager.toLowerCase()) : true;
            const matchesVendor = filtersActive.vendor ? loan.vendor.vendor_name.toLowerCase().includes(filtersActive.vendor.toLowerCase()) : true;
            return matchesStartDate && matchesEndDate && matchesManager && matchesVendor;
        });
        setFilteredActiveLoans(filteredActive);
    };

    const paginate = (items, pageNumber, itemsPerPage) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const activeLoansPage = paginate(filteredActiveLoans, currentPageActive, itemsPerPage);

    return (
        <div style={{ marginTop: '40px' }}>
            <h2 className="text-2xl font-bold mb-4">Your Active Loans</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Start Date:</label>
                <input type="date" name="startDate" value={filtersActive.startDate} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">End Date:</label>
                <input type="date" name="endDate" value={filtersActive.endDate} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Loan Manager:</label>
                <input type="text" name="loanManager" value={filtersActive.loanManager} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Vendor:</label>
                <input type="text" name="vendor" value={filtersActive.vendor} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            {filteredActiveLoans.length > 0 ? (
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
                            {activeLoansPage.map(loan => (
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
                                        <button onClick={() => handlePayEMI(loan)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">Pay EMI</button>
                                        <button onClick={() => handleRaiseQuery(loan.id, loan.manager.user_id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">Need Support</button>
                                        <button onClick={() => handleViewRepayments(loan.id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">View Repayments</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredActiveLoans.length}
                        paginate={setCurrentPageActive}
                        currentPage={currentPageActive}
                    />
                </>
            ) : (
                <p className="text-gray-600">No Active Loans</p>
            )}
        </div>
    );
};

export default ActiveLoans;

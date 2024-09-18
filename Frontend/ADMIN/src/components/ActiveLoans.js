import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
 
const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Fetch active loans data from the server
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:9191/api/loans');
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans', error);
      }
    };
    fetchLoans();
  }, []);
 
  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
 
  // Handle sort functionality
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };
 
  // Paginate data
  const paginate = (items, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };
 
  // Filter and sort loans
  const filteredLoans = loans
    .filter((loan) => loan.status === 'active')
    .filter((loan) => {
      return (
        loan.id.toString().includes(searchTerm) ||
        loan.customerId.toString().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });
 
  const paginatedLoans = paginate(filteredLoans, currentPage, itemsPerPage);
 
  return (
    <div>
      <AdminNavbar />
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">Active Loans</h2>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by Loan ID or Customer ID"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('id')}
              >
                Loan ID
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('customerId')}
              >
                Customer ID
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                Loan Amount
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Loan Status
              </th>
              {/* <th className="py-2 px-4 border-b">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedLoans.map((loan) => (
              <tr key={loan.id}>
                <td className="py-2 px-4 border-b">{loan.id}</td>
                <td className="py-2 px-4 border-b">{loan.customerId}</td>
                <td className="py-2 px-4 border-b">{loan.amount}</td>
                <td className="py-2 px-4 border-b">{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-5">
          <button
            className="bg-gray-300 py-2 px-4 rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="py-2 px-4">{currentPage}</span>
          <button
            className="bg-gray-300 py-2 px-4 rounded"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(filteredLoans.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(filteredLoans.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default ActiveLoans;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterDate, setFilterDate] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8082/users/read');
      const customerData = response.data.filter(user => user.role === 'CUSTOMER');
      setCustomers(customerData);
      setFilteredCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    const searchResults = customers.filter(customer =>
      customer.user_id.toString().includes(searchTerm) ||
      customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(searchResults);
  }, [searchTerm, customers]);

  useEffect(() => {
    //another copy of the filtetedCustomers
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      if (sortField) {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        if (sortOrder === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      }
      return 0;
    });
    setFilteredCustomers(sortedCustomers);
  }, [sortField, sortOrder]);

  useEffect(() => {
    const normalizeDate = (dateString) => {
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date;
    };

    const handleFilter = () => {
      if (!filterDate.start || !filterDate.end) {
        setFilteredCustomers(customers);
        return;
      }
      const startDate = normalizeDate(filterDate.start);
      const endDate = normalizeDate(filterDate.end);

      const filterResults = customers.filter(customer => {
        const customerDate = normalizeDate(customer.createdAt);
        return customerDate >= startDate && customerDate <= endDate;
      });

      setFilteredCustomers(filterResults);
    };
    handleFilter();
  }, [filterDate, customers]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (!isNaN(date)) {
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    }
    return 'Invalid date';
  };

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col items-center p-5 bg-[#E7EEE1] min-h-screen">
        <h2 className="text-2xl font-bold mb-5">View Customer Details</h2>
        <div className="flex flex-wrap justify-between items-center w-full max-w-6xl mb-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Search Customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/4"
          />
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2 w-full md:w-3/4">
            <div className="flex flex-wrap items-center space-x-2">
              <label className="whitespace-nowrap">Sort by:</label>
              <select onChange={(e) => setSortField(e.target.value)} className="p-2 border border-gray-300 rounded">
                <option value="">Select Field</option>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="user_id">Customer ID</option>
              </select>
              <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 border border-gray-300 rounded">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center space-x-2">
              <label className="whitespace-nowrap">Filter by date:</label>
              <input
                type="date"
                value={filterDate.start}
                onChange={(e) => setFilterDate({ ...filterDate, start: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={filterDate.end}
                onChange={(e) => setFilterDate({ ...filterDate, end: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl bg-[#5F7A61] rounded-lg shadow-lg p-5">
          <h3 className="text-lg font-bold mb-4 text-white">Customer Database</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Customer ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Account created</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map(customer => (
                <tr key={customer.user_id} className="border-t">
                  <td className="py-4 px-6">{customer.user_id}</td>
                  <td className="py-4 px-6">{`${customer.first_name} ${customer.last_name}`}</td>
                  <td className="py-4 px-6">{customer.email}</td>
                  <td className="py-4 px-6">{customer.phone}</td>
                  <td className="py-4 px-6">{formatDate(customer.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredCustomers.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`py-2 px-4 mx-1 ${index + 1 === currentPage ? 'bg-[#4caf50] text-white' : 'bg-white text-black'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;

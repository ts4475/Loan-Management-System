import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Support = () => {
  const [openTickets, setOpenTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [filteredOpenTickets, setFilteredOpenTickets] = useState([]);
  const [filteredClosedTickets, setFilteredClosedTickets] = useState([]);
  const [searchTermOpen, setSearchTermOpen] = useState('');
  const [searchTermClosed, setSearchTermClosed] = useState('');
  const [sortFieldOpen, setSortFieldOpen] = useState('');
  const [sortFieldClosed, setSortFieldClosed] = useState('');
  const [sortOrderOpen, setSortOrderOpen] = useState('asc');
  const [sortOrderClosed, setSortOrderClosed] = useState('asc');
  const [currentPageOpen, setCurrentPageOpen] = useState(1);
  const [currentPageClosed, setCurrentPageClosed] = useState(1);
  const itemsPerPage = 5;
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const fetchOpenTickets = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8085/supports/open/${userId}`);
      setOpenTickets(response.data);
      setFilteredOpenTickets(response.data);
    } catch (error) {
      console.error('Error fetching open tickets', error);
    }
  }, [userId]);

  const fetchClosedTickets = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8085/supports/closed/${userId}`);
      setClosedTickets(response.data);
      setFilteredClosedTickets(response.data);
    } catch (error) {
      console.error('Error fetching closed tickets', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchOpenTickets();
    fetchClosedTickets();
  }, [fetchOpenTickets, fetchClosedTickets]);

  useEffect(() => {
    const searchResultsOpen = openTickets.filter(ticket =>
      ticket.support_id.toString().includes(searchTermOpen) ||
      ticket.customer_id.toString().includes(searchTermOpen) ||
      ticket.subject.toLowerCase().includes(searchTermOpen.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTermOpen.toLowerCase())
    );
    setFilteredOpenTickets(searchResultsOpen);
  }, [searchTermOpen, openTickets]);

  useEffect(() => {
    const searchResultsClosed = closedTickets.filter(ticket =>
      ticket.support_id.toString().includes(searchTermClosed) ||
      ticket.customer_id.toString().includes(searchTermClosed) ||
      ticket.subject.toLowerCase().includes(searchTermClosed.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTermClosed.toLowerCase())
    );
    setFilteredClosedTickets(searchResultsClosed);
  }, [searchTermClosed, closedTickets]);

  useEffect(() => {
    const sortedTicketsOpen = [...filteredOpenTickets].sort((a, b) => {
      if (sortFieldOpen) {
        const fieldA = a[sortFieldOpen];
        const fieldB = b[sortFieldOpen];
        if (sortOrderOpen === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      }
      return 0;
    });
    setFilteredOpenTickets(sortedTicketsOpen);
  }, [sortFieldOpen, sortOrderOpen]);

  useEffect(() => {
    const sortedTicketsClosed = [...filteredClosedTickets].sort((a, b) => {
      if (sortFieldClosed) {
        const fieldA = a[sortFieldClosed];
        const fieldB = b[sortFieldClosed];
        if (sortOrderClosed === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      }
      return 0;
    });
    setFilteredClosedTickets(sortedTicketsClosed);
  }, [sortFieldClosed, sortOrderClosed]);

  const handleResolveTicket = async (ticketId, reply) => {
    try {
      await axios.patch(`http://localhost:8085/supports/partial-update/${ticketId}`, {
        reply: reply,
        ticket_status: 'CLOSE'
      });
      fetchOpenTickets();
      fetchClosedTickets();
    } catch (error) {
      console.error('Error resolving ticket', error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:8085/supports/delete/${ticketId}`);
      fetchClosedTickets();
    } catch (error) {
      console.error('Error deleting ticket', error);
    }
  };

  const handlePageChangeOpen = (pageNumber) => {
    setCurrentPageOpen(pageNumber);
  };

  const handlePageChangeClosed = (pageNumber) => {
    setCurrentPageClosed(pageNumber);
  };

  const paginatedOpenTickets = filteredOpenTickets.slice(
    (currentPageOpen - 1) * itemsPerPage,
    currentPageOpen * itemsPerPage
  );

  const paginatedClosedTickets = filteredClosedTickets.slice(
    (currentPageClosed - 1) * itemsPerPage,
    currentPageClosed * itemsPerPage
  );

  return (
    <div><AdminNavbar/>
      <div className="flex flex-col items-center p-5 bg-[#E7EEE1] min-h-screen">
        <h2 className="text-2xl font-bold mb-5">Support Page</h2>
        {/* <button onClick={() => navigate('/dashboard')} className="mb-5 bg-green-700 text-white py-2 px-4 rounded">Back to Dashboard</button> */}

        <h3 className="text-xl font-semibold mb-3">Open Tickets</h3>
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-4">
          <input
            type="text"
            placeholder="Search by Support ID, Customer ID, Subject, Description"
            value={searchTermOpen}
            onChange={(e) => setSearchTermOpen(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <label className="whitespace-nowrap">Sort by:</label>
            <select onChange={(e) => setSortFieldOpen(e.target.value)} className="p-2 border border-gray-300 rounded">
              <option value="">Select Field</option>
              <option value="support_id">Support ID</option>
              <option value="customer_id">Customer ID</option>
            </select>
            <select onChange={(e) => setSortOrderOpen(e.target.value)} className="p-2 border border-gray-300 rounded">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="w-full max-w-6xl bg-[#5F7A61] rounded-lg shadow-lg p-5 mb-5">
          {paginatedOpenTickets.length > 0 ? paginatedOpenTickets.map(ticket => (
            <div className="bg-white p-4 rounded-lg mb-4 shadow-md" key={ticket.support_id}>
              <p><strong>Support ID:</strong> {ticket.support_id}</p>
              <p><strong>Customer ID:</strong> {ticket.customer_id}</p>
              <p><strong>Subject:</strong> {ticket.subject}</p>
              <p><strong>Description:</strong> {ticket.description}</p>
              {ticket.attachment_url && (
                <>
                  <img src={ticket.attachment_url} alt="attachment" className="w-full h-auto mb-2" />
                  <div className="flex space-x-2">
                    <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                    <a href={ticket.attachment_url} download className="text-blue-500 underline">Download</a>
                  </div>
                </>
              )}
              <textarea placeholder="Reply..." onChange={(e) => ticket.reply = e.target.value} className="mt-2 p-2 border border-gray-300 rounded w-full"></textarea>
              <button onClick={() => handleResolveTicket(ticket.support_id, ticket.reply)} className="mt-2 bg-green-700 text-white py-2 px-4 rounded">Mark as Resolved</button>
            </div>
          )) : <p>No open tickets available</p>}
        </div>
        <div className="pagination flex justify-center mb-5">
          {Array.from({ length: Math.ceil(filteredOpenTickets.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChangeOpen(index + 1)}
              className={`py-2 px-4 mx-1 ${index + 1 === currentPageOpen ? 'bg-[#4caf50] text-white' : 'bg-white text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-3">Closed Tickets</h3>
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-4">
          <input
            type="text"
            placeholder="Search by Support ID, Customer ID, Subject, Description"
            value={searchTermClosed}
            onChange={(e) => setSearchTermClosed(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <label className="whitespace-nowrap">Sort by:</label>
            <select onChange={(e) => setSortFieldClosed(e.target.value)} className="p-2 border border-gray-300 rounded">
              <option value="">Select Field</option>
              <option value="support_id">Support ID</option>
              <option value="customer_id">Customer ID</option>
            </select>
            <select onChange={(e) => setSortOrderClosed(e.target.value)} className="p-2 border border-gray-300 rounded">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="w-full max-w-6xl bg-[#5F7A61] rounded-lg shadow-lg p-5">
          {paginatedClosedTickets.length > 0 ? paginatedClosedTickets.map(ticket => (
            <div className="bg-white p-4 rounded-lg mb-4 shadow-md" key={ticket.support_id}>
              <p><strong>Support ID:</strong> {ticket.support_id}</p>
              <p><strong>Customer ID:</strong> {ticket.customer_id}</p>
              <p><strong>Subject:</strong> {ticket.subject}</p>
              <p><strong>Description:</strong> {ticket.description}</p>
              <p><strong>Reply:</strong> {ticket.reply}</p>
              {ticket.attachment_url && (
                <>
                  <img src={ticket.attachment_url} alt="attachment" className="w-full h-auto mb-2" />
                  <div className="flex space-x-2">
                    <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                    <a href={ticket.attachment_url} download className="text-blue-500 underline">Download</a>
                  </div>
                </>
              )}
              <button onClick={() => handleDeleteTicket(ticket.support_id)} className="mt-2 bg-red-700 text-white py-2 px-4 rounded">Delete</button>
            </div>
          )) : <p>No closed tickets available</p>}
        </div>
        <div className="pagination flex justify-center">
          {Array.from({ length: Math.ceil(filteredClosedTickets.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChangeClosed(index + 1)}
              className={`py-2 px-4 mx-1 ${index + 1 === currentPageClosed ? 'bg-[#4caf50] text-white' : 'bg-white text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;

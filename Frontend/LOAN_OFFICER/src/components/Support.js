
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Support.css';

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
    const handleSearchOpen = () => {
      const searchResultsOpen = openTickets.filter(ticket =>
        ticket.support_id.toString().includes(searchTermOpen) ||
        ticket.customer_id.toString().includes(searchTermOpen) ||
        ticket.subject.toLowerCase().includes(searchTermOpen.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTermOpen.toLowerCase())
      );
      setFilteredOpenTickets(searchResultsOpen);
    };

    handleSearchOpen();
  }, [searchTermOpen, openTickets]);

  useEffect(() => {
    const handleSearchClosed = () => {
      const searchResultsClosed = closedTickets.filter(ticket =>
        ticket.support_id.toString().includes(searchTermClosed) ||
        ticket.customer_id.toString().includes(searchTermClosed) ||
        ticket.subject.toLowerCase().includes(searchTermClosed.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTermClosed.toLowerCase())
      );
      setFilteredClosedTickets(searchResultsClosed);
    };

    handleSearchClosed();
  }, [searchTermClosed, closedTickets]);

  useEffect(() => {
    const handleSortOpen = () => {
      const sortedTickets = [...filteredOpenTickets].sort((a, b) => {
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
      setFilteredOpenTickets(sortedTickets);
    };

    handleSortOpen();
  }, [sortFieldOpen, sortOrderOpen, openTickets]);

  useEffect(() => {
    const handleSortClosed = () => {
      const sortedTickets = [...filteredClosedTickets].sort((a, b) => {
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
      setFilteredClosedTickets(sortedTickets);
    };

    handleSortClosed();
  }, [sortFieldClosed, sortOrderClosed, closedTickets]);

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

  const sendConfirmationEmail = async (ticketId, customerId, subject, description, reply) => {
    try {
      // Fetch customer email from the backend
      const response = await axios.get(`http://localhost:8082/users/readEmail/${customerId}`);
      const customerEmail = response.data;
      console.log("sending email");
      // const customerEmail = 'anveshashukla00@gmail.com';
  
      // Prepare email details
      const emailDetails = {

        recipient: customerEmail,
        subject: `Support Ticket Resolved: ${subject}`,
        support: {support_id: ticketId},
        msgBody: `Dear Customer,
  
  Your support ticket with ID: ${ticketId} has been resolved.
  
  Ticket Details:
  
  Subject: ${subject}
  Description: ${description}
  Reply: ${reply}
  
  Thank you,
  Support Team`
      };
  
      // Send email with ticket details
      await axios.post(`http://localhost:8085/supports/send-email`, emailDetails);
      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email', error);
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


  // const handleResolveAndSendEmail = (ticketId, customerId, subject, description, reply) => {
  //   console.log("in Fun 1")
  //   handleResolveTicket(ticketId, reply);
  //   sendConfirmationEmail(ticketId, customerId, subject, description, reply);
  // };

  const handleResolveAndSendEmail = async (ticketId, customerId, subject, description, reply) => {
    try {
      await handleResolveTicket(ticketId, reply);
      await sendConfirmationEmail(ticketId, customerId, subject, description, reply);
    } catch (error) {
      console.error('Error resolving ticket and sending email', error);
    }
  };
  

  return (
    <div>
      <h2>Support Page</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>

      <h3>Open Tickets</h3>
      <div className="search-sort-filter">
        <input
          type="text"
          placeholder="Search by Support ID, Customer ID, Subject, Description"
          value={searchTermOpen}
          onChange={(e) => setSearchTermOpen(e.target.value)}
        />
        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortFieldOpen(e.target.value)}>
            <option value="">Select Field</option>
            <option value="support_id">Support ID</option>
            <option value="customer_id">Customer ID</option>
          </select>
          <select onChange={(e) => setSortOrderOpen(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="ticket-section">
        {paginatedOpenTickets.length > 0 ? paginatedOpenTickets.map(ticket => (
          <div className="ticket-tile" key={ticket.support_id}>
            <p><strong>Support ID:</strong> {ticket.support_id}</p>
            <p><strong>Customer ID:</strong> {ticket.customer_id}</p>
            <p><strong>Loan ID:</strong> {ticket.loan_id}</p>
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <img src={ticket.attachment_url} alt="attachment" className="ticket-image" />
            <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer">View</a> |
            <a href={ticket.attachment_url} download>Download</a>
            <textarea placeholder="Reply..." onChange={(e) => ticket.reply = e.target.value}></textarea>
            {/* <button onClick={() => handleResolveTicket(ticket.support_id, ticket.reply)}>Mark as Resolved</button> */}
            <button onClick={() => {handleResolveAndSendEmail(ticket.support_id, ticket.customer_id, ticket.subject, ticket.description, ticket.reply)}}
            className="mt-2 bg-green-700 text-white py-2 px-4 rounded">Mark as Resolved</button>
          </div>
        )) : <p>No open tickets available</p>}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredOpenTickets.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeOpen(index + 1)}
            className={index + 1 === currentPageOpen ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <h3>Closed Tickets</h3>
      <div className="search-sort-filter">
        <input
          type="text"
          placeholder="Search by Support ID, Customer ID, Subject, Description"
          value={searchTermClosed}
          onChange={(e) => setSearchTermClosed(e.target.value)}
        />
        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortFieldClosed(e.target.value)}>
            <option value="">Select Field</option>
            <option value="support_id">Support ID</option>
            <option value="customer_id">Customer ID</option>
          </select>
          <select onChange={(e) => setSortOrderClosed(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="ticket-section">
        {paginatedClosedTickets.length > 0 ? paginatedClosedTickets.map(ticket => (
          <div className="ticket-tile" key={ticket.support_id}>
            <p><strong>Support ID:</strong> {ticket.support_id}</p>
            <p><strong>Customer ID:</strong> {ticket.customer_id}</p>
            <p><strong>Loan ID:</strong> {ticket.loan_id}</p>
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Reply:</strong> {ticket.reply}</p>
            <img src={ticket.attachment_url} alt="attachment" className="ticket-image" />
            <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer">View</a> |
            <a href={ticket.attachment_url} download>Download</a>

          </div>
        )) : <p>No closed tickets available</p>}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredClosedTickets.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeClosed(index + 1)}
            className={index + 1 === currentPageClosed ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Support;


 


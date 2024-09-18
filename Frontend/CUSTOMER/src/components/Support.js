import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
 
const Support = () => {
  const { user } = useContext(UserContext);
  const [formVisible, setFormVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [message, setMessage] = useState('');
  const [openTickets, setOpenTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [searchOpen, setSearchOpen] = useState('');
  const [searchClosed, setSearchClosed] = useState('');
  const [sortOpen, setSortOpen] = useState({ column: '', order: '' });
  const [sortClosed, setSortClosed] = useState({ column: '', order: '' });
  const [currentPageOpen, setCurrentPageOpen] = useState(1);
  const [currentPageClosed, setCurrentPageClosed] = useState(1);
  const [loanId, setLoanId] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const itemsPerPage = 5;
 
  const location = useLocation();
 
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loanIdParam = queryParams.get('loanId');
    const managerIdParam = queryParams.get('managerId');
 
    if (loanIdParam && managerIdParam) {
      setLoanId(loanIdParam);
      setManagerId(managerIdParam);
      setFormVisible(false);
    }
 
    fetchOpenTickets();
    fetchClosedTickets();
    fetchUsers();
  }, [user.userId, location.search]);
 
  const fetchUsers = () => {
    axios.get('http://localhost:8082/users/read')
      .then(response => {
        const usersMap = response.data.reduce((acc, user) => {
          acc[user.user_id] = `${user.first_name} ${user.last_name}`;
          return acc;
        }, {});
        setUsers(usersMap);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  };
 
  const fetchOpenTickets = () => {
    axios.get(`http://localhost:8085/supports/open-cust/${user.userId}`)
      .then(response => {
        setOpenTickets(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching open tickets!', error);
      });
  };
 
  const fetchClosedTickets = () => {
    axios.get(`http://localhost:8085/supports/closed-cust/${user.userId}`)
      .then(response => {
        setClosedTickets(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching closed tickets!', error);
      });
  };
 
  const handleRaiseQuery = () => {
    setFormVisible(true);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const ticketData = {
      subject,
      description,
      attachment_url: attachmentUrl,
      assigned_user_id: managerId || 1,
      customer_id: user.userId,
      loan_id: loanId || null,
      ticket_status: 'OPEN'
    };
 
    axios.post('http://localhost:8085/supports/add', ticketData)
      .then(response => {
        setMessage(`Ticket Raised Successfully, ticket id generated: ${response.data.support_id}`);
        setFormVisible(false);
        setSubject('');
        setDescription('');
        setAttachmentUrl('');
        fetchOpenTickets();
      })
      .catch(error => {
        console.error('There was an error raising the ticket!', error);
      });
  };
 
  const handleDeleteTicket = (supportId) => {
    axios.delete(`http://localhost:8085/supports/delete/${supportId}`)
      .then(() => {
        fetchOpenTickets();
      })
      .catch(error => {
        console.error('There was an error deleting the ticket!', error);
      });
  };
 
  const handleSearchOpen = (e) => {
    setSearchOpen(e.target.value);
  };
 
  const handleSearchClosed = (e) => {
    setSearchClosed(e.target.value);
  };
 
  const handleSortOpen = (column, order) => {
    setSortOpen({ column, order });
  };
 
  const handleSortClosed = (column, order) => {
    setSortClosed({ column, order });
  };
 
  const sortedFilteredOpenTickets = openTickets
    .filter(ticket => ticket.subject.toLowerCase().includes(searchOpen.toLowerCase()) || String(ticket.support_id).includes(searchOpen))
    .sort((a, b) => {
      if (sortOpen.column) {
        if (sortOpen.order === 'asc') {
          return a[sortOpen.column] > b[sortOpen.column] ? 1 : -1;
        } else {
          return a[sortOpen.column] < b[sortOpen.column] ? 1 : -1;
        }
      }
      return 0;
    });
 
  const sortedFilteredClosedTickets = closedTickets
    .filter(ticket => ticket.subject.toLowerCase().includes(searchClosed.toLowerCase()) || String(ticket.support_id).includes(searchClosed))
    .sort((a, b) => {
      if (sortClosed.column) {
        if (sortClosed.order === 'asc') {
          return a[sortClosed.column] > b[sortClosed.column] ? 1 : -1;
        } else {
          return a[sortClosed.column] < b[sortClosed.column] ? 1 : -1;
        }
      }
      return 0;
    });
 
  const indexOfLastOpenTicket = currentPageOpen * itemsPerPage;
  const indexOfFirstOpenTicket = indexOfLastOpenTicket - itemsPerPage;
  const currentOpenTickets = sortedFilteredOpenTickets.slice(indexOfFirstOpenTicket, indexOfLastOpenTicket);
 
  const indexOfLastClosedTicket = currentPageClosed * itemsPerPage;
  const indexOfFirstClosedTicket = indexOfLastClosedTicket - itemsPerPage;
  const currentClosedTickets = sortedFilteredClosedTickets.slice(indexOfFirstClosedTicket, indexOfLastClosedTicket);
 
  const paginateOpen = pageNumber => setCurrentPageOpen(pageNumber);
  const paginateClosed = pageNumber => setCurrentPageClosed(pageNumber);
 
  const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
 
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
 
    return (
      // <nav>
      //   <ul className="pagination">
      //     {pageNumbers.map(number => (
      //       <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
      //         <a onClick={() => paginate(number)} href="#!" className="page-link">
      //           {number}
      //         </a>
      //       </li>
      //     ))}
      //   </ul>
      // </nav>
      <nav>
        <ul className="pagination flex justify-center mt-4">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''} mx-1`}>
              <button onClick={() => paginate(number)} className="page-link px-3 py-1 border rounded bg-white hover:bg-gray-200">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
 
  return (
    // <div>
    //   <h2>Need Help, don't worry!</h2>
    //   <button onClick={handleRaiseQuery}>Raise a Query</button>
    //   {formVisible && (
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label>Subject:</label>
    //         <input
    //           type="text"
    //           value={subject}
    //           onChange={(e) => setSubject(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Description:</label>
    //         <textarea
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Attachment URL:</label>
    //         <input
    //           type="text"
    //           value={attachmentUrl}
    //           onChange={(e) => setAttachmentUrl(e.target.value)}
    //         />
    //       </div>
    //       <button type="submit">Raise Ticket</button>
    //     </form>
    //   )}
    //   {message && <p>{message}</p>}
 
    //   <h3>Open Tickets</h3>
    //   <input
    //     type="text"
    //     placeholder="Search Open Tickets"
    //     value={searchOpen}
    //     onChange={handleSearchOpen}
    //   />
    //   <div>
    //     <label>Sort By:</label>
    //     <select onChange={(e) => handleSortOpen(e.target.value, sortOpen.order)}>
    //       <option value="">Select</option>
    //       <option value="support_id">Support ID</option>
    //       <option value="created_at">Created At</option>
    //     </select>
    //     <select onChange={(e) => handleSortOpen(sortOpen.column, e.target.value)}>
    //       <option value="asc">Ascending</option>
    //       <option value="desc">Descending</option>
    //     </select>
    //   </div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Support ID</th>
    //         <th>Subject</th>
    //         <th>Description</th>
    //         <th>Attachment</th>
    //         <th>Created At</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {currentOpenTickets.length > 0 ? (
    //         currentOpenTickets.map(ticket => (
    //           <tr key={ticket.support_id}>
    //             <td>{ticket.support_id}</td>
    //             <td>{ticket.subject}</td>
    //             <td>{ticket.description}</td>
    //             <td>
    //               {ticket.attachment_url && (
    //                 <div>
    //                   <img src={ticket.attachment_url} alt="attachment" width="50" height="50" />
    //                   <br />
    //                   <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer">View</a> | <a href={ticket.attachment_url} download>Download</a>
    //                 </div>
    //               )}
    //             </td>
    //             <td>{new Date(ticket.created_at).toLocaleString()}</td>
    //             <td>
    //               <button onClick={() => handleDeleteTicket(ticket.support_id)}>Delete</button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="6">No Open Tickets</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    //   <Pagination
    //     itemsPerPage={itemsPerPage}
    //     totalItems={sortedFilteredOpenTickets.length}
    //     paginate={paginateOpen}
    //     currentPage={currentPageOpen}
    //   />
 
    //   <h3>Closed Tickets</h3>
    //   <input
    //     type="text"
    //     placeholder="Search Closed Tickets"
    //     value={searchClosed}
    //     onChange={handleSearchClosed}
    //   />
    //   <div>
    //     <label>Sort By:</label>
    //     <select onChange={(e) => handleSortClosed(e.target.value, sortClosed.order)}>
    //       <option value="">Select</option>
    //       <option value="support_id">Support ID</option>
    //       <option value="created_at">Created At</option>
    //       <option value="updated_at">Updated At</option>
    //     </select>
    //     <select onChange={(e) => handleSortClosed(sortClosed.column, e.target.value)}>
    //       <option value="asc">Ascending</option>
    //       <option value="desc">Descending</option>
    //     </select>
    //   </div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Support ID</th>
    //         <th>Subject</th>
    //         <th>Description</th>
    //         <th>Attachment</th>
    //         <th>Reply</th>
    //         <th>Assigned User</th>
    //         <th>Created At</th>
    //         <th>Updated At</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {currentClosedTickets.length > 0 ? (
    //         currentClosedTickets.map(ticket => (
    //           <tr key={ticket.support_id}>
    //             <td>{ticket.support_id}</td>
    //             <td>{ticket.subject}</td>
    //             <td>{ticket.description}</td>
    //             <td>
    //               {ticket.attachment_url && (
    //                 <div>
    //                   <img src={ticket.attachment_url} alt="attachment" width="50" height="50" />
    //                   <br />
    //                   <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer">View</a> | <a href={ticket.attachment_url} download>Download</a>
    //                 </div>
    //               )}
    //             </td>
    //             <td>{ticket.reply}</td>
    //             <td>{users[ticket.assigned_user_id]}</td>
    //             <td>{new Date(ticket.created_at).toLocaleString()}</td>
    //             <td>{new Date(ticket.updated_at).toLocaleString()}</td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="8">No Closed Tickets</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    //   <Pagination
    //     itemsPerPage={itemsPerPage}
    //     totalItems={sortedFilteredClosedTickets.length}
    //     paginate={paginateClosed}
    //     currentPage={currentPageClosed}
    //   />
    // </div>

    <div className=" bg-[#E7EEE1] min-h-screen">
      <Navbar/>
      <br/>
      <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Need Help, don't worry!</h2>
      <button onClick={handleRaiseQuery} className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-4">Raise a Query</button>
      {formVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label className="block text-gray-700">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Attachment URL:</label>
            <input
              type="text"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <button type="submit" className="bg-[#5F7A61] text-white py-2 px-4 rounded">Raise Ticket</button>
        </form>
      )}
      {message && <p className="text-green-500">{message}</p>}

      <h3 className="text-xl font-bold mb-4 text-[#5F7A61]">Open Tickets</h3>
      <input
        type="text"
        placeholder="Search Open Tickets"
        value={searchOpen}
        onChange={handleSearchOpen}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="mb-4">
        <label className="block text-gray-700">Sort By:</label>
        <select onChange={(e) => handleSortOpen(e.target.value, sortOpen.order)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="">Select</option>
          <option value="support_id">Support ID</option>
          <option value="created_at">Created At</option>
        </select>
        <select onChange={(e) => handleSortOpen(sortOpen.column, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <table className="min-w-full bg-white">
          <thead className="bg-[#5F7A61] text-white">
            <tr>
              <th className="px-4 py-2">Support ID</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Attachment</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOpenTickets.length > 0 ? (
              currentOpenTickets.map(ticket => (
                <tr key={ticket.support_id} className="border-b last:border-none hover:bg-gray-100">
                  <td className="px-4 py-2">{ticket.support_id}</td>
                  <td className="px-4 py-2">{ticket.subject}</td>
                  <td className="px-4 py-2">{ticket.description}</td>
                  <td className="px-4 py-2">
                    {ticket.attachment_url && (
                      <div>
                        <img src={ticket.attachment_url} alt="attachment" className="w-12 h-12 inline-block" />
                        <br />
                        <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a> | <a href={ticket.attachment_url} download className="text-blue-500 hover:underline">Download</a>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{new Date(ticket.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleDeleteTicket(ticket.support_id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No Open Tickets</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={sortedFilteredOpenTickets.length}
          paginate={paginateOpen}
          currentPage={currentPageOpen}
        />
      </div>

      <h3 className="text-xl font-bold mb-4 text-[#5F7A61]">Closed Tickets</h3>
      <input
        type="text"
        placeholder="Search Closed Tickets"
        value={searchClosed}
        onChange={handleSearchClosed}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="mb-4">
        <label className="block text-gray-700">Sort By:</label>
        <select onChange={(e) => handleSortClosed(e.target.value, sortClosed.order)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="">Select</option>
          <option value="support_id">Support ID</option>
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>
        </select>
        <select onChange={(e) => handleSortClosed(sortClosed.column, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-[#5F7A61] text-white">
            <tr>
              <th className="px-4 py-2">Support ID</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Attachment</th>
              <th className="px-4 py-2">Reply</th>
              <th className="px-4 py-2">Assigned User</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {currentClosedTickets.length > 0 ? (
              currentClosedTickets.map(ticket => (
                <tr key={ticket.support_id} className="border-b last:border-none hover:bg-gray-100">
                  <td className="px-4 py-2">{ticket.support_id}</td>
                  <td className="px-4 py-2">{ticket.subject}</td>
                  <td className="px-4 py-2">{ticket.description}</td>
                  <td className="px-4 py-2">
                    {ticket.attachment_url && (
                      <div>
                        <img src={ticket.attachment_url} alt="attachment" className="w-12 h-12 inline-block" />
                        <br />
                        <a href={ticket.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a> | <a href={ticket.attachment_url} download className="text-blue-500 hover:underline">Download</a>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{ticket.reply}</td>
                  <td className="px-4 py-2">{users[ticket.assigned_user_id]}</td>
                  <td className="px-4 py-2">{new Date(ticket.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">{new Date(ticket.updated_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No Closed Tickets</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={sortedFilteredClosedTickets.length}
          paginate={paginateClosed}
          currentPage={currentPageClosed}
        />
      </div>
    </div>
  );
};
 
export default Support;
// // src/components/Navbar.js
// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';

// const Navbar = () => {
//   const { user, logout } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     if (user && user.userId) {
//       axios.get(`http://localhost:8086/notifications/read?userId=${user.userId}`)
//         .then(response => {
//           const allNotifications = response.data;
//           const openNotifications = allNotifications.filter(notification => notification.status === 'OPEN');
//           setNotifications(openNotifications);

//         })
//         .catch(error => {
//           console.error('Error fetching notifications:', error);
//         });
//     }
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     navigate('/logout');
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const markAsRead = (notificationId) => {
//     axios.put(`http://localhost:8086/notifications/update/${notificationId}`, { status: 'CLOSED' })
//       .then(() => {
//         setNotifications(notifications.filter(notification => notification.notificationId !== notificationId));
//       })
//       .catch(error => {
//         console.error('Error marking notification as read:', error);
//       });
//   };
  

//   return (
//     <nav style={navStyle}>
//       <h1 style={logoStyle}>Loan Application</h1>
//       <div style={buttonContainerStyle}>
//         <button onClick={() => handleNavigation('/dashboard')}>Homepage</button>
//         <button onClick={() => handleNavigation('/support')}>Support</button>
//         <button onClick={() => handleNavigation('/myprofile')}>My Profile</button>
//         <div style={{ position: 'relative' }}>
//           <button onClick={() => setDropdownOpen(!dropdownOpen)}>Notifications</button>
//           {dropdownOpen && (
//             <div style={dropdownStyle}>
//               {notifications.map(notification => (
//                 <div key={notification.notificationId} style={notificationItemStyle}>
//                   <p style={{ color: '#000' }}>{notification.notificationBody}</p>
//                   <button onClick={() => markAsRead(notification.notificationId)}>Mark as Read</button>
//                 </div>
//               ))}
//               <button onClick={() => handleNavigation('/notifications')}>View All Notifications</button>
//             </div>
//           )}
//         </div>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </nav>
//   );
// };

// const navStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   padding: '10px 20px',
//   backgroundColor: '#333',
//   color: '#fff'
// };

// const logoStyle = {
//   margin: 0
// };

// const buttonContainerStyle = {
//   display: 'flex',
//   gap: '10px'
// };

// const dropdownStyle = {
//   position: 'absolute',
//   top: '100%',
//   right: 0,
//   backgroundColor: '#fff',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   borderRadius: '4px',
//   padding: '10px',
//   zIndex: 1000
// };

// const notificationItemStyle = {
//   marginBottom: '10px',
//   color: '#000' // Set text color to black
// };

// export default Navbar;

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faUser, faLifeRing, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
 
const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  useEffect(() => {
    if (user && user.userId) {
      axios.get(`http://localhost:8086/notifications/read?userId=${user.userId}`)
        .then(response => {
          const allNotifications = response.data;
          const openNotifications = allNotifications.filter(notification => notification.status === 'OPEN');
          setNotifications(openNotifications);
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, [user]);
 
  const handleLogout = () => {
    logout();
    navigate('/logout');
  };
 
  const handleNavigation = (path) => {
    navigate(path);
  };
 
  const markAsRead = (notificationId) => {
    axios.put(`http://localhost:8086/notifications/update/${notificationId}`, { status: 'CLOSED' })
      .then(() => {
        setNotifications(notifications.filter(notification => notification.notificationId !== notificationId));
      })
      .catch(error => {
        console.error('Error marking notification as read:', error);
      });
  };
 
  return (
    <div className="w-full flex justify-between items-center bg-[#5F7A61] p-4 text-white">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBars} className="text-2xl mr-2 cursor-pointer" />
        <span className="font-bold text-lg">Capital Nest</span>
      </div>
      <div className="flex items-center space-x-6">
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/dashboard')}
        >
          <FontAwesomeIcon icon={faHome} className="text-2xl" />
          <span className="text-sm">Homepage</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/support')}
        >
          <FontAwesomeIcon icon={faLifeRing} className="text-2xl" />
          <span className="text-sm">Support</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/myprofile')}
        >
          <FontAwesomeIcon icon={faUser} className="text-2xl" />
          <span className="text-sm">My Profile</span>
        </div>
        <div className="relative flex flex-col items-center cursor-pointer hover:text-gray-300">
          <FontAwesomeIcon icon={faBell} className="text-2xl" onClick={() => setDropdownOpen(!dropdownOpen)} />
          <span className="text-sm">Notifications</span>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-10">
              <div className="p-4">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.notificationId} className="mb-2">
                      <p>{notification.notificationBody}</p>
                      <button
                        onClick={() => markAsRead(notification.notificationId)}
                        className="text-blue-500 hover:underline"
                      >
                        Mark as Read
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No new notifications</p>
                )}
                <button
                  onClick={() => handleNavigation('/notifications')}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;

// // src/components/NotificationsPage.js
// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';

// const NotificationsPage = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [openNotifications, setOpenNotifications] = useState([]);
//   const [closedNotifications, setClosedNotifications] = useState([]);

//   useEffect(() => {
//     if (user && user.userId) {
//       axios.get(`http://localhost:8086/notifications/read?userId=${user.userId}`)
//         .then(response => {
//           const allNotifications = response.data;
//           const openNotifications = allNotifications.filter(notification => notification.status === 'OPEN');
//           const closedNotifications = allNotifications.filter(notification => notification.status === 'CLOSE');
          
//           setOpenNotifications(openNotifications);
//           setClosedNotifications(closedNotifications);
//         })
//         .catch(error => {
//           console.error('Error fetching notifications:', error);
//         });
//     }
//   }, [user]);
  

//   const markAsRead = (notificationId) => {
//     axios.put(`http://localhost:8086/notifications/update/${notificationId}`, { status: 'CLOSED' })
//       .then(() => {
//         setOpenNotifications(openNotifications.filter(notification => notification.notificationId !== notificationId));
//         setClosedNotifications([...closedNotifications, openNotifications.find(notification => notification.notificationId === notificationId)]);
//       })
//       .catch(error => {
//         console.error('Error marking notification as read:', error);
//       });
//   };



//   return (
//     <div>
//       <h2>Notifications</h2>
//       <h3>Open Notifications</h3>
//       {openNotifications.map(notification => (
//         <div key={notification.notificationId}>
//           <p>{notification.notificationBody}</p>
//           <button onClick={() => markAsRead(notification.notificationId)}>Mark as Read</button>
//         </div>
//       ))}
//       <h3>Closed Notifications</h3>
//       {closedNotifications.map(notification => (
//         <div key={notification.notificationId}>
//           <p>{notification.notificationBody}</p>
//         </div>
//       ))}
//       <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
//     </div>
//   );
// };

// export default NotificationsPage;
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const NotificationsPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState([]);
  const [closedNotifications, setClosedNotifications] = useState([]);

  useEffect(() => {
    if (user && user.userId) {
      axios.get(`http://localhost:8086/notifications/read?userId=${user.userId}`)
        .then(response => {
          const allNotifications = response.data;
          const openNotifications = allNotifications.filter(notification => notification.status === 'OPEN');
          const closedNotifications = allNotifications.filter(notification => notification.status === 'CLOSED');
          
          setOpenNotifications(openNotifications);
          setClosedNotifications(closedNotifications);
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, [user]);

  const markAsRead = (notificationId) => {
    axios.put(`http://localhost:8086/notifications/update/${notificationId}`, { status: 'CLOSED' })
      .then(() => {
        setOpenNotifications(openNotifications.filter(notification => notification.notificationId !== notificationId));
        const updatedNotification = openNotifications.find(notification => notification.notificationId === notificationId);
        updatedNotification.status = 'CLOSED';
        setClosedNotifications([...closedNotifications, updatedNotification]);
      })
      .catch(error => {
        console.error('Error marking notification as read:', error);
      });
  };

  return (
    <div>
      <h2>Notifications</h2>
      <h3>Open Notifications</h3>
      {openNotifications.map(notification => (
        <div key={notification.notificationId}>
          <p>{notification.notificationBody}</p>
          <button onClick={() => markAsRead(notification.notificationId)}>Mark as Read</button>
        </div>
      ))}
      <h3>Closed Notifications</h3>
      {closedNotifications.map(notification => (
        <div key={notification.notificationId}>
          <p>{notification.notificationBody}</p>
        </div>
      ))}
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default NotificationsPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaLock, FaEdit } from 'react-icons/fa';
// import Navbar from './Navbar';

// const MyAccount = () => {
//   const [userData, setUserData] = useState({});
//   const [vendorData, setVendorData] = useState({});
//   const [loanProducts, setLoanProducts] = useState([]);
//   const [editField, setEditField] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
//   const [securityData, setSecurityData] = useState({ question: '', answer: '', password: '' });
//   const [passwordStrength, setPasswordStrength] = useState('');
//   const [passwordMatch, setPasswordMatch] = useState('');
//   //const [manager, setManager] = useState('')
//   const navigate = useNavigate();

//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const userResponse = await axios.get(`http://localhost:8082/users/readOne/${userId}`);
//             setUserData(userResponse.data);

//             const managersResponse = await axios.get('http://localhost:8084/managers/read');
//             const allManagers = managersResponse.data;
//             const currentManager = allManagers.find(manager => manager.user_id === parseInt(userId));

//             if (currentManager) {
//                 const vendorId = currentManager.vendor_id;

//                 const vendorsResponse = await axios.get('http://localhost:8084/vendors/read');
//                 const allVendors = vendorsResponse.data;
//                 const currentVendor = allVendors.find(vendor => vendor.vendor_id === vendorId);
//                 setVendorData(currentVendor || {});

//                 const loanProductsResponse = await axios.get('http://localhost:8083/loan_products/read');
//                 const allLoanProducts = loanProductsResponse.data;
//                 const currentLoanProducts = allLoanProducts.filter(product => product.vendor_id === vendorId);
//                 setLoanProducts(currentLoanProducts);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     fetchData();
// }, [userId]);


//   const handleEdit = (field) => {
//     setEditField(field);
//     setUpdatedData({ ...updatedData, [field]: '' });
//   };

//   const handleChange = (e) => {
//     setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:8082/users/update/${userId}`, { ...userData, ...updatedData });
//       setUserData({ ...userData, ...updatedData });
//       setEditField(null);
//       alert('Account Details Updated Successfully');
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordMatch('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8082/users/login', { email: userData.email, password: passwordData.currentPassword });

//       if (response.status === 200) {
//         await axios.put(`http://localhost:8082/users/update/${userId}`, { ...userData, password: passwordData.newPassword });
//         alert('Password Reset Successful');
//         setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//         setPasswordMatch('');
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       alert('Password Incorrect');
//     }
//   };

//   const handleSecurityChange = async () => {
//     try {
//       const response = await axios.post('http://localhost:8082/users/login', { email: userData.email, password: securityData.password });

//       if (response.status === 200) {
//         await axios.put(`http://localhost:8082/users/update/${userId}`, { ...userData, security_question: securityData.question, security_answer: securityData.answer });
//         alert('Security Question and Answer Updated Successfully');
//         setSecurityData({ question: '', answer: '', password: '' });
//       }
//     } catch (error) {
//       console.error('Error changing security question:', error);
//       alert('Password Incorrect');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h2>Welcome {userData.first_name}</h2>
//         <div style={styles.section}>
//           <h3>User Details</h3>
//           <div style={styles.field}>
//             <input type="text" value={userData.first_name} readOnly style={styles.input} />
//             <FaLock style={styles.icon} />
//           </div>
//           <div style={styles.field}>
//             <input type="text" value={userData.last_name} readOnly style={styles.input} />
//             <FaLock style={styles.icon} />
//           </div>
//           <div style={styles.field}>
//             <input type="text" value={userData.pan} readOnly style={styles.input} />
//             <FaLock style={styles.icon} />
//           </div>
//           <div style={styles.field}>
//             <input type="text" value={userData.dob} readOnly style={styles.input} />
//             <FaLock style={styles.icon} />
//           </div>
//         </div>
//         <div style={styles.section}>
//           <h3>Additional Details</h3>
//           <div style={styles.field}>
//             <input type="text" name="phone" value={editField === 'phone' ? updatedData.phone : userData.phone} onChange={handleChange} readOnly={editField !== 'phone'} placeholder="Enter New Phone" style={styles.input} />
//             {editField !== 'phone' && <FaEdit style={styles.icon} onClick={() => handleEdit('phone')} />}
//           </div>
//           <div style={styles.field}>
//             <input type="email" name="email" value={editField === 'email' ? updatedData.email : userData.email} onChange={handleChange} readOnly={editField !== 'email'} placeholder="Enter New Email" style={styles.input} />
//             {editField !== 'email' && <FaEdit style={styles.icon} onClick={() => handleEdit('email')} />}
//           </div>
//           <div style={styles.field}>
//             <input type="text" name="address" value={editField === 'address' ? updatedData.address : userData.address} onChange={handleChange} readOnly={editField !== 'address'} placeholder="Enter New Address" style={styles.input} />
//             {editField !== 'address' && <FaEdit style={styles.icon} onClick={() => handleEdit('address')} />}
//           </div>
//           <div style={styles.field}>
//             <input type="text" name="pin" value={editField === 'pin' ? updatedData.pin : userData.pin} onChange={handleChange} readOnly={editField !== 'pin'} placeholder="Enter New PIN" style={styles.input} />
//             {editField !== 'pin' && <FaEdit style={styles.icon} onClick={() => handleEdit('pin')} />}
//           </div>
//           {editField && <button onClick={handleSave} style={styles.button}>Save</button>}
//         </div>
//         <div style={styles.section}>
//           <h3>Password</h3>
//           <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} placeholder="Current Password" style={styles.input} />
//           <input type="password" name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} placeholder="New Password" style={styles.input} />
//           <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} placeholder="Confirm Password" style={styles.input} />
//           {passwordMatch && <p>{passwordMatch}</p>}
//           <button onClick={handlePasswordChange} style={styles.button}>Save</button>
//         </div>
//         <div style={styles.section}>
//           <h3>Security Question</h3>
//           <select name="question" value={securityData.question} onChange={(e) => setSecurityData({ ...securityData, question: e.target.value })} style={styles.input}>
//             <option value="">Select Security Question</option>
//             <option value="FIRST_SCHOOL">First School</option>
//             <option value="GRANDMOTHER_NAME">Grandmother's Name</option>
//             <option value="FAVOURITE_FOOD">Favourite Food</option>
//           </select>
//           <input type="text" name="answer" value={securityData.answer} onChange={(e) => setSecurityData({ ...securityData, answer: e.target.value })} placeholder="Security Answer" style={styles.input} />
//           <input type="password" name="password" value={securityData.password} onChange={(e) => setSecurityData({ ...securityData, password: e.target.value })} placeholder="Enter Password" style={styles.input} />
//           <button onClick={handleSecurityChange} style={styles.button}>Submit</button>
//         </div>
//         <div style={styles.section}>
//           <h3>Vendor Details</h3>
//           <div style={styles.field}>
//             <label>Vendor Name: </label>
//             <input type="text" value={vendorData.vendor_name} readOnly style={styles.input} />
//           </div>
//           <div style={styles.field}>
//             <label>Contact Email: </label>
//             <input type="email" value={vendorData.contact_email} readOnly style={styles.input} />
//           </div>
//           <div style={styles.field}>
//             <label>Contact Phone: </label>
//             <input type="text" value={vendorData.contact_phone} readOnly style={styles.input} />
//           </div>
//           <div style={styles.field}>
//             <label>Vendor Logo: </label>
//             <img src={vendorData.vendor_logo} alt="Vendor Logo" style={styles.image} />
//           </div>
//           <div style={styles.field}>
//             <label>Loan Products: </label>
//             <ul>
//               {loanProducts.map((product) => (
//                 <li key={product.product_id}>{product.product_type}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <button onClick={() => navigate('/dashboard')} style={styles.button}>Back to Dashboard</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//   },
//   section: {
//     marginBottom: '20px',
//   },
//   field: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   input: {
//     padding: '10px',
//     marginRight: '10px',
//     width: '300px',
//   },
//   icon: {
//     cursor: 'pointer',
//   },
//   button: {
//     padding: '10px 20px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '5px',
//   },
//   image: {
//     width: '100px',
//     height: '100px',
//   },
// };

// export default MyAccount;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MyAccount = () => {
  const [userData, setUserData] = useState({});
  const [loanProducts, setLoanProducts] = useState([]);
  const [editField, setEditField] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [securityData, setSecurityData] = useState({ question: '', answer: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8082/users/readOne/${userId}`);
        setUserData(userResponse.data);

        const managersResponse = await axios.get('http://localhost:8084/managers/read');
        const allManagers = managersResponse.data;
        const currentManager = allManagers.find(manager => manager.user_id === parseInt(userId));

        if (currentManager) {
          const vendorId = currentManager.vendor_id;

          const loanProductsResponse = await axios.get('http://localhost:8083/loan_products/read');
          const allLoanProducts = loanProductsResponse.data;
          const currentLoanProducts = allLoanProducts.filter(product => product.vendor_id === vendorId);
          setLoanProducts(currentLoanProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleEdit = (field) => {
    setEditField(field);
    setUpdatedData({ ...updatedData, [field]: '' });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8082/users/update/${userId}`, updatedData);
      setUserData({ ...userData, ...updatedData });
      setEditField(null);
      alert('Account Details Updated Successfully');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Failed to update account details');
    }
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New Password and Confirm Password do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/users/login', {
        email: userData.email,
        password: passwordData.currentPassword,
      });

      if (response.status === 200) {
        await axios.put(`http://localhost:8082/users/update/${userId}`, {
          password: passwordData.newPassword,
        });
        alert('Password Reset Successful');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Current Password is incorrect');
    }
  };

  const handleSecuritySave = async () => {
    try {
      const response = await axios.post('http://localhost:8082/users/login', {
        email: userData.email,
        password: securityData.password,
      });

      if (response.status === 200) {
        console.log('Password verified successfully, updating security question and answer...');
        console.log('Security Question:', securityData.question);
        console.log('Security Answer:', securityData.answer);

        const updateResponse = await axios.put(`http://localhost:8082/users/update/${userId}`, {
          security_question: securityData.question,
          security_answer: securityData.answer,
        });

        console.log('Update Response:', updateResponse);
        alert('Data Updated Successfully');
      } else {
        console.error('Password verification failed:', response.status);
        alert('Password is incorrect');
      }
    } catch (error) {
      console.error('Error updating security details:', error);
      alert('Password is incorrect');
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = '';
    if (password.length > 8) {
      strength = 'Strong';
    } else if (password.length > 5) {
      strength = 'Medium';
    } else {
      strength = 'Weak';
    }
    setPasswordStrength(strength);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>My Account</h2>
        <div className="section">
          <h3>User Details</h3>
          <div>
            <label>First Name:</label>
            <input type="text" value={userData.first_name || ''} disabled />
            <FaLock />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" value={userData.last_name || ''} disabled />
            <FaLock />
          </div>
          <div>
            <label>PAN:</label>
            <input type="text" value={userData.pan || ''} disabled />
            <FaLock />
          </div>
          <div>
            <label>DOB:</label>
            <input type="date" value={userData.dob || ''} disabled />
            <FaLock />
          </div>
        </div>
        <div className="section">
          <h3>Additional Details</h3>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={editField === 'phone' ? updatedData.phone : userData.phone || ''}
              onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
              disabled={editField !== 'phone'}
            />
            {editField !== 'phone' && <button onClick={() => handleEdit('phone')}>Edit</button>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editField === 'email' ? updatedData.email : userData.email || ''}
              onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
              disabled={editField !== 'email'}
            />
            {editField !== 'email' && <button onClick={() => handleEdit('email')}>Edit</button>}
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={editField === 'address' ? updatedData.address : userData.address || ''}
              onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
              disabled={editField !== 'address'}
            />
            {editField !== 'address' && <button onClick={() => handleEdit('address')}>Edit</button>}
          </div>
          <div>
            <label>PIN:</label>
            <input
              type="text"
              value={editField === 'pin' ? updatedData.pin : userData.pin || ''}
              onChange={(e) => setUpdatedData({ ...updatedData, pin: e.target.value })}
              disabled={editField !== 'pin'}
            />
            {editField !== 'pin' && <button onClick={() => handleEdit('pin')}>Edit</button>}
          </div>
          {editField && <button onClick={handleSave}>Save</button>}
        </div>
        <div className="section">
          <h3>Password</h3>
          <div>
            <label>Current Password:</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => {
                setPasswordData({ ...passwordData, newPassword: e.target.value });
                evaluatePasswordStrength(e.target.value);
              }}
            />
            <div>{passwordStrength}</div>
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => {
                setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                setPasswordMatch(e.target.value === passwordData.newPassword ? 'Passwords match' : 'Passwords do not match');
              }}
            />
            <div>{passwordMatch}</div>
          </div>
          <button onClick={handlePasswordSave}>Save</button>
        </div>
        <div className="section">
          <h3>Security Question</h3>
          <div>
            <label>Security Question:</label>
            <select
              value={securityData.question}
              onChange={(e) => setSecurityData({ ...securityData, question: e.target.value })}
            >
              <option value="FIRST_SCHOOL">First School</option>
              <option value="GRANDMOTHER_NAME">Grandmother's Name</option>
              <option value="FAVOURITE_FOOD">Favourite Food</option>
            </select>
          </div>
          <div>
            <label>Security Answer:</label>
            <input
              type="text"
              value={securityData.answer}
              onChange={(e) => setSecurityData({ ...securityData, answer: e.target.value })}
            />
          </div>
          <div>
            <label>Enter Password:</label>
            <input
              type="password"
              value={securityData.password}
              onChange={(e) => setSecurityData({ ...securityData, password: e.target.value })}
            />
          </div>
          <button onClick={handleSecuritySave}>Save</button>
        </div>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default MyAccount;





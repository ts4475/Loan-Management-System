import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Logo from '../Photos/Profile data-cuate.svg';

const MyAccount = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    pan: '',
    address: '',
    pin: '',
    email: '',
    phone: ''
  });
  const [editData, setEditData] = useState({
    address: '',
    pin: '',
    email: '',
    phone: ''
  });
  const [isEditable, setIsEditable] = useState({
    address: false,
    pin: false,
    email: false,
    phone: false
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/users/readOne/${userId}`);
          setUserData(response.data);
          setEditData({
            address: response.data.address || '',
            pin: response.data.pin || '',
            email: response.data.email || '',
            phone: response.data.phone || ''
          });
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };
      fetchUserData();
    } else {
      console.error('No userId found in localStorage');
    }
  }, [userId]);

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:8082/users/update/${userId}`, {
        ...userData,
        address: editData.address,
        pin: editData.pin,
        email: editData.email,
        phone: editData.phone,
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
      setPasswordStrength(getPasswordStrength(value));
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setConfirmPasswordMessage(value === newPassword ? 'Passwords match' : 'Passwords do not match');
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Weak';
    } else if (password.length < 10) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  };

  const handlePasswordSave = async () => {
    try {
      const response = await axios.post('http://localhost:8082/users/login', {
        email: userData.email,
        password: currentPassword,
      });
      if (response.status === 200) {
        if (newPassword === confirmPassword) {
          await axios.put(`http://localhost:8082/users/update/${userId}`, {
            ...userData,
            password: newPassword,
          });
          alert('Password updated successfully');
        } else {
          alert('New passwords do not match');
        }
      } else {
        setPasswordMessage('Current password is incorrect');
      }
    } catch (error) {
      console.error('Error resetting password', error);
      setPasswordMessage('Current password is incorrect');
    }
  };

  const enableEdit = (field) => {
    setIsEditable({
      ...isEditable,
      [field]: true
    });
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col items-center p-5 bg-[#E7EEE1] min-h-screen">
        <h2 className="text-2xl font-bold mb-5">Fill in Your Personal Details</h2>
        <div className="flex justify-center mb-5 w-full max-w-6xl bg-[#B9D79F] p-10 rounded-lg shadow-lg" style={{ height: 'auto' }}>
          <div className="w-1/4">
            <img src={Logo} alt="SVG Illustration" className="w-full h-auto" />
          </div>
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">First Name:</label>
                <input
                  type="text"
                  value={userData.first_name}
                  readOnly
                  className="mt-1 p-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">Last Name:</label>
                <input
                  type="text"
                  value={userData.last_name}
                  readOnly
                  className="mt-1 p-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">DOB:</label>
                <input
                  type="text"
                  value={userData.dob}
                  readOnly
                  className="mt-1 p-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">PAN:</label>
                <input
                  type="text"
                  value={userData.pan}
                  readOnly
                  className="mt-1 p-2 border border-gray-300 rounded w-2/3"
                />
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleEditChange}
                  readOnly={!isEditable.address}
                  className={`mt-1 p-2 border border-gray-300 rounded w-2/3 ${isEditable.address ? 'bg-white' : 'bg-gray-200'}`}
                />
                <button
                  onClick={() => enableEdit('address')}
                  className="ml-3 bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4b624e]"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">PIN:</label>
                <input
                  type="text"
                  name="pin"
                  value={editData.pin}
                  onChange={handleEditChange}
                  readOnly={!isEditable.pin}
                  className={`mt-1 p-2 border border-gray-300 rounded w-2/3 ${isEditable.pin ? 'bg-white' : 'bg-gray-200'}`}
                />
                <button
                  onClick={() => enableEdit('pin')}
                  className="ml-3 bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4b624e]"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  readOnly={!isEditable.email}
                  className={`mt-1 p-2 border border-gray-300 rounded w-2/3 ${isEditable.email ? 'bg-white' : 'bg-gray-200'}`}
                />
                <button
                  onClick={() => enableEdit('email')}
                  className="ml-3 bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4b624e]"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center relative">
                <label className="block text-gray-700 w-1/3">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  readOnly={!isEditable.phone}
                  className={`mt-1 p-2 border border-gray-300 rounded w-2/3 ${isEditable.phone ? 'bg-white' : 'bg-gray-200'}`}
                />
                <button
                  onClick={() => enableEdit('phone')}
                  className="ml-3 bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4b624e]"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button onClick={handleEditSave} className="bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4b624e]">Save</button>
        </div>
        <div className="flex flex-col items-center mt-10 bg-[#B9D79F] p-5 rounded-lg shadow-lg w-full max-w-6xl" style={{ height: 'auto' }}>
          <h3 className="text-xl font-bold mb-5">Change Password</h3>
          <div className="w-full">
            <div className="mb-5">
              <label className="block text-gray-700">Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handlePasswordChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <p className="text-sm text-gray-500">Password strength: {passwordStrength}</p>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700">Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <p className="text-sm text-gray-500">{confirmPasswordMessage}</p>
            </div>
            <div className="flex justify-center">
              <button onClick={handlePasswordSave} className="bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4b624e]">Save Password</button>
            </div>
            {passwordMessage && <p className="text-red-500 mt-5">{passwordMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;






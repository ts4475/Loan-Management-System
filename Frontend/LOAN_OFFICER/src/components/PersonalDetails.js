import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PersonalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedVendor, email } = location.state;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Add to users table
      const userResponse = await axios.post('http://localhost:8082/users/add', {
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        pin,
        pan,
        dob,
        password,
        securityQuestion,
        securityAnswer,
        role: 'LOAN_OFFICER'
      });

      const userId = userResponse.data.user_id;

      // Store user_id in local storage
      localStorage.setItem('user_id', userId);

      // Fetch vendor_id using selectedVendor
      const vendorResponse = await axios.get(`http://localhost:8084/vendors/read`);
      const vendor = vendorResponse.data.find(v => v.vendor_name === selectedVendor);
      const vendorId = vendor.vendor_id;

      // Add to managers table
      await axios.post('http://localhost:8084/managers/add', {
        user: { user_id: userId },
        vendor: { vendor_id: vendorId }
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting details:', error);
    }
  };

  return (
    <div>
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>PIN:</label>
          <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} required />
        </div>
        <div>
          <label>PAN:</label>
          <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div>
          <label>Security Question:</label>
          <select value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} required>
            <option value="">Select a Security Question</option>
            <option value="FIRST_SCHOOL">First School</option>
            <option value="GRANDMOTHER_NAME">Grandmother's Name</option>
            <option value="FAVOURITE_FOOD">Favourite Food</option>
          </select>
        </div>
        <div>
          <label>Security Answer:</label>
          <input type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonalDetails;

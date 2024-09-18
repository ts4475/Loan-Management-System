import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vendors from the backend
    axios.get('http://localhost:8084/vendors/read')
      .then(response => {
        setVendors(response.data);
      })
      .catch(error => {
        console.error('Error fetching vendors:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/personal-details', { state: { selectedVendor, email } });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Institution Name:</label>
          <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)} required>
            <option value="">Select Institution</option>
            {vendors.map(vendor => (
              <option key={vendor.vendor_id} value={vendor.vendor_name}>{vendor.vendor_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;

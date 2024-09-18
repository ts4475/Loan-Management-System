import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaUser, FaLifeRing } from 'react-icons/fa';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#333',
    padding: '10px'
  };

  const iconStyle = {
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    marginLeft: '15px'
  };

  return (
    <div style={navbarStyle}>
      <FaHome onClick={() => navigate('/dashboard')} style={iconStyle} />
      <FaUser onClick={() => navigate('/myaccount')} style={iconStyle} />
      <FaLifeRing onClick={() => navigate('/support')} style={iconStyle} />
      <FaSignOutAlt onClick={handleLogout} style={iconStyle} />
    </div>
  );
};

export default AdminNavbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaLifeRing, FaUser, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/logout');
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <h2>Loan Officer Dashboard</h2>
      </div>
      <div style={styles.navbarRight}>
        <FaSignOutAlt onClick={handleLogout} style={styles.icon} />
        <FaLifeRing onClick={() => navigate('/support')} style={styles.icon} />
        <FaUser onClick={() => navigate('/myaccount')} style={styles.icon} />
        <FaHome onClick={() => navigate('/dashboard')} style={styles.icon} />
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  navbarLeft: {
    fontSize: '1.5rem',
  },
  navbarRight: {
    display: 'flex',
    gap: '20px',
  },
  icon: {
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

export default Navbar;

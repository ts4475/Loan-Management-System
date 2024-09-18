import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user_id');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>User successfully logged out</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
};

export default Logout;

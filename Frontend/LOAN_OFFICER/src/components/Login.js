import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/users/lo-login', {
        email,
        password,
      });

      const user = response.data;

      if (user.role === 'LOAN_OFFICER') {
        localStorage.setItem('user_id', user.user_id);
        navigate('/dashboard');
      } else {
        alert('You are not authorized to access this page.');
      }
    } catch (error) {
      alert('Invalid email or password.');
    }
  };

  return (
    <div>
      <h2>Loan Officer Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

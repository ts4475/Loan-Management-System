import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../Photos/Profile data-cuate.svg'; // assuming the logo is placed in the assets folder

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
      const response = await axios.post('http://localhost:8082/users/admin-login', {
        email,
        password,
      });

      const user = response.data;

      if (user.role === 'ADMIN') {
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
    <div className="min-h-screen flex items-center justify-center bg-[#5F7A61]">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden">
        <div className="w-1/2 bg-green-100 p-10 flex items-center justify-center">
          <img src={Logo} alt="Capital Nest" className="w-2/3" />
        </div>
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-5">Hey Admin! <br/>Good to have you back</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Type your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Type your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-[#4a604b]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

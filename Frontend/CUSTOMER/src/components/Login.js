import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserService from '../services/userService';
import './Css/login.css';
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
 
    UserService.login(loginData).then((response) => {
      setUser({ userId: response.data.user_id });
      navigate('/dashboard');
    }).catch(error => {
      setErrorMessage(error.response.data);
    });
  };
 
  return (
    <div className="container">
      <div className="logo">
        <div className="logo-content">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7519df54e633c6df8b9d7cb73ff470957ff732550ec008e97fad55622e3434d3?apiKey=7120d99d010b4354b0bc3141e774ab8b&"
            className="logo-img"
            alt="Logo"
          />
          <div className="logo-text">Capital Nest</div>
        </div>
        <div className="logo-section">
          <div className="logo-image">
            <div className="logo-column">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3e2cbe1ce39bf7b7ce55bfdedfe724c2c9d917ddb9ccf4402a03302c9903944?apiKey=7120d99d010b4354b0bc3141e774ab8b&"
                className="login-img"
                alt="Login Image"
              />
            </div>
            <div className="login-form-column">
              <div className="login-form-content">
                <div className="login-form-header">
                  <div className="div-9">
                    Hey !<br />
                    Good to have you back
                  </div>
                  <div className="login-input-label">Email :</div>
                  <form onSubmit={handleSubmit}>
                    <input
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <div className="login-input-label">Password:</div>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className="forgot-password" onClick={() => navigate('/forgot-password')}>Forget Password?</div>
                    <button className="login-button">Login</button>
                  </form>
                </div>
                <div className="login-divider">
                  <div className="login-divider-line" />
                  <div className="login-divider-text">OR</div>
                  <div className="login-divider-line" />
                </div>
 
                <button className="login-otp-button" onClick={() => navigate('/login-otp')}>Login Through OTP</button>
                <div className="login-signup-link" onClick={() => navigate('/signup')}>Don’t have an account? Sign Up!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
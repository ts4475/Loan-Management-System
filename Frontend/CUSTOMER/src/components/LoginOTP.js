import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { UserContext } from '../context/UserContext';
import './Css/loginOtp.css';
import ResetPassword from './Image/resetPassword.png';
 
const LoginOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
 
  const handleSendOTP = (e) => {
    e.preventDefault();
    UserService.sendOTP({ recipient: email })
      .then((response) => {
        setOtpSent(true);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('No User exists with this Email Id');
      });
  };
 
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    UserService.loginOTPVerify({ email, otp })
      .then((response) => {
        if (response.data) {
          setUser({ userId: response.data.user_id });
          navigate('/dashboard');
        } else {
          setErrorMessage('Incorrect OTP');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Incorrect OTP');
      });
  };
 
 
  return (
    <div className='container6'>
      <div className="left">
        <img src={ResetPassword} alt="Reset Password" className="image" />
      </div>
      <div className="right">
        <div className="container1">
          <div className="reset-password-form">
            <div className="email-section">
              <label htmlFor="email" className="label">Email</label>
              <form onSubmit={handleSendOTP}>
                <input
                  id='email'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className='Input'
                  required
                />
                <div className="form-group">
 
                  <button type="submit" className='send-otp'>Send OTP</button>
                </div>
              </form>
            </div>
            {otpSent && (
              <div className='form-group'>
                <form onSubmit={handleVerifyOTP}>
                  <label htmlFor="otp" className="label">OTP</label>
                  <input
                    id='otp'
                    name='otp'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                  <button type="submit" className='verify-button'>Submit</button>
                </form>
              </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className="send-otp" onClick={() => navigate('/')}>Login through Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default LoginOTP;

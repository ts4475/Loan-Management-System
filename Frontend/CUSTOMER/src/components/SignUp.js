import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './Css/signup.css';
 
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
 
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8082/users/sendotp', { recipient: email })
      .then(response => {
        if (response.data === 'OTP sent successfully to ' + email) {
          setOtpSent(true);
          setErrorMessage('');
        } else {
          setErrorMessage('Error sending OTP. Please try again.');
        }
      })
      .catch(error => {
        console.error('There was an error sending the OTP!', error);
        setErrorMessage('Error sending OTP. Please try again.');
      });
  };
 
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8082/users/api/email/verifyotp', { email, otp })
      .then(response => {
        if (response.data === 'OTP Verified Successfully') {
          setOtpVerified(true);
          setUser((prevUser) => ({ ...prevUser, email }));
          navigate('/personal-details', { state: { email } });
        } else {
          setErrorMessage('Invalid OTP. Please try again.');
        }
      })
      .catch(error => {
        console.error('There was an error verifying the OTP!', error);
        setErrorMessage('Error verifying OTP. Please try again.');
      });
  };
 
  return (
    <div className='signup-container'>
      <div className='signup-logo'>
      <div className="logo_name">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7519df54e633c6df8b9d7cb73ff470957ff732550ec008e97fad55622e3434d3?apiKey=7120d99d010b4354b0bc3141e774ab8b&"
            className="logo-img"
            alt="Logo"
          />
          <div className="logo-text">Capital Nest</div>
        </div>
        <div className="glass-effect">
          <div className="signup-content">
            <div className="signup-image-column">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3e2cbe1ce39bf7b7ce55bfdedfe724c2c9d917ddb9ccf4402a03302c9903944?apiKey=7120d99d010b4354b0bc3141e774ab8b&"
                className="signup-image"
                alt="Login Image"
              />
            </div>
            <div className="signup-form-column">
              <div className="signup-form">
              <div className="div-8">
              <div className="form-group">
                    <label htmlFor="email" className="label">Email</label>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          {!otpSent && (
          <button type="submit" className='send-otp'>Get OTP</button>
          )}
        </form>
        </div>
       {otpSent && !otpVerified ? (
        <form onSubmit={handleOtpSubmit}>
          <p>Please enter the OTP below to verify your email.</p>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit" className='verify-otp'>Verify OTP</button>
        </form>
      ) : null}
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
};
 
export default SignUp;
 
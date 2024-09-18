import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import './Css/forgotPassword.css';
import ResetPassword from './Image/resetPassword.png';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false); // Control visibility of OTP input
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleSendOTP = (e) => {
    e.preventDefault();
    UserService.sendOTP({ recipient: email })
      .then((response) => {
        setOtpSent(true);
        setOtpVisible(true); // Make OTP input visible
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('No User exists with this Email Id');
      });
  };
 
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    UserService.verifyOTP({ email, otp })
      .then((response) => {
        if (response.data === 'OTP Verified Successfully') {
          setOtpVerified(true);
          setErrorMessage('');
        } else {
          setErrorMessage('Incorrect OTP');
        }
      })
      .catch((error) => {
        setErrorMessage('Incorrect OTP');
      });
  };
 
  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      UserService.updatePassword({ email, newPassword })
        .then((response) => {
          alert('Password Reset Successfully, Redirecting you back to the Login Page in 3 seconds');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage('Error resetting password');
        });
    } else {
      setErrorMessage('Passwords do not match');
    }
  };
 
  return (
    <div className="container2">
      <div className="left1">
        <img src={ResetPassword} alt="Reset Password" className="image" />
      </div>
      <div className="right1">
        <div className="container1">
          <div className="reset-password-form1">
            <form onSubmit={handleSendOTP}>
              <div className="email-section1">
                <label htmlFor="email-input1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {!otpVisible && (
                <>
                <button className="get-otp">Send OTP</button>
                <p className="or-text">OR</p>
                <button className="reset-password1" onClick={() => navigate('/forgot-password-sq')}>Reset Password through Security Question</button>
                </>
              )}
            </form>
            {otpVisible && !otpVerified && (
              <form onSubmit={handleVerifyOTP}>
                <label htmlFor="otp" className="label">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className='otp'
                  required
                />
                <button type="submit" className='verify-otp'>Verify OTP</button>
              </form>
            )}
            {otpVerified && (
              <form onSubmit={handlePasswordReset}>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
                <button type="submit" className='send-otp'>Submit</button>
              </form>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ForgotPassword;

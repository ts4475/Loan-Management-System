import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import ResetPassword from './Image/resetPassword.png';
 
const ForgotPasswordSQ = () => {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();
 
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    UserService.getSecurityQuestion({ recipient: email })
      .then((response) => {
        setSecurityQuestion(response.data);
        setErrorMessage('');
        alert('Email is correct');
        setShowSecurityQuestion(true);
      })
      .catch((error) => {
        setErrorMessage('No User exists with this Email Id');
      });
  };
 
  const handleSecurityAnswerSubmit = (e) => {
    e.preventDefault();
    UserService.verifySecurityAnswer({ email, answer: securityAnswer })
      .then((response) => {
        if (response.data === 'Security Answer Verified Successfully') {
          setErrorMessage('');
          setShowPasswordReset(true);
        } else {
          setErrorMessage('Security Answer Does not Match');
        }
      })
      .catch((error) => {
        setErrorMessage('Security Answer Does not Match');
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
    <div className='container2'>
      <div className="left1">
        <img src={ResetPassword} alt="Reset Password" className="image" />
      </div>
      <div className="right1">
        <div className="container1">
          <div className="reset-password-form1">
            <div className="email-section1">
              <label htmlFor="email-input1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={showSecurityQuestion || showPasswordReset}
              />
            </div>
            {!showSecurityQuestion && !showPasswordReset && (
              <div>
                <button type="submit" className='send-otp' onClick={handleEmailSubmit}>Submit</button>
                <button className='send-otp' onClick={() => navigate('/forgot-password')}>Reset Password through OTP</button>
                <button className='send-otp' onClick={() => navigate('/')}>Login</button>
              </div>
            )}
            {showSecurityQuestion && !showPasswordReset && (
              <div>
                <h3>{securityQuestion}</h3>
                <form onSubmit={handleSecurityAnswerSubmit}>
                  <input
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder="Enter Security Answer"
                    required
                  />
                  <button type="submit" className='send-otp'>Submit</button>
                </form>
              </div>
            )}
            {showPasswordReset && (
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
 
export default ForgotPasswordSQ;
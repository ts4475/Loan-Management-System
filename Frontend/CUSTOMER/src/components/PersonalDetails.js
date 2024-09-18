import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserService from '../services/userService';
import './Css/personalDetails.css';
 
const PersonalDetails = () => {
  const { setUser } = useContext(UserContext);
  const [localUser, setLocalUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
 
  const securityQuestions = ['FIRST_SCHOOL', 'GRANDMOTHER_NAME', 'FAVOURITE_FOOD'];
 
  useEffect(() => {
    if (location.state && location.state.email) {
      setLocalUser((prevUser) => ({ ...prevUser, email: location.state.email }));
    }
  }, [location.state]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localUser.password !== localUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const { confirmPassword, ...userData } = localUser; // Exclude confirmPassword
    userData.role = 'CUSTOMER';
    UserService.addUser(userData).then((response) => {
      setUser({ userId: response.data.user_id }); // Set only userId
      navigate('/dashboard');
    }).catch(error => {
      console.error('There was an error!', error);
      alert('Error: ' + error.message);
    });
  };
 
  return (
    <div className='capital-container'>
      <h1 className="capital-title">Capital Nest</h1>
      <h2 className="capital-form-heading">Personal Details</h2>
      <div className="capital-form-container">
        <h4 className="capital-otp-success">OTP Verification Successful! Kindly Fill Your Personal Details</h4>
      <form className="capital-form" onSubmit={handleSubmit}>
      <div className="capital-form-row">
            <div className="capital-form-group">
            <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="first_name"
          value={localUser.first_name || ''}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        </div>
        <div className="capital-form-group">
        <label htmlFor="firstName">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={localUser.last_name || ''}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        </div>
        </div>
        <div className="capital-form-row">
            <div className="capital-form-group">
            <label htmlFor="mobile">Mobile Number</label>
        <input
          type="text"
          name="phone"
          value={localUser.phone || ''}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        </div>
        <div className="capital-form-group">
              <label htmlFor="pinCode">Address</label>
        <input
          type="text"
          name="address"
          value={localUser.address || ''}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        </div>
        </div>
        <div className="capital-form-row">
            <div className="capital-form-group">
              <label htmlFor="address">Pin</label>
        <input
          type="text"
          name="pin"
          value={localUser.pin || ''}
          onChange={handleChange}
          placeholder="PIN"
          required
        />
        </div>
        <div className="capital-form-group">
              <label htmlFor="city">D.O.B</label>
        <input
          type="date"
          name="dob"
          value={localUser.dob || ''}
          onChange={handleChange}
          required
        />
        </div>
        </div>
        <div className="capital-form-row">
            <div className="capital-form-group">
              <label htmlFor="state">Password</label>
        <input
          type="password"
          name="password"
          value={localUser.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        </div>
        <div className="capital-form-group">
              <label htmlFor="country">Confirm-Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={localUser.confirmPassword || ''}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        </div>
        </div>
        <div className="capital-form-row">
            <div className="capital-form-group">
            <label htmlFor="country">Security Questions</label>
        <select
          name="securityQuestion"
          value={localUser.securityQuestion || ''}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Security Question</option>
          {securityQuestions.map((question) => (
            <option key={question} value={question}>{question}</option>
          ))}
        </select>
        </div>
        <div className="capital-form-group">
              <label htmlFor="confirmPassword">Answer</label>
        <input
          type="text"
          name="securityAnswer"
          value={localUser.securityAnswer || ''}
          onChange={handleChange}
          placeholder="Security Answer"
          required
        />
        </div>
        </div>
        <button type="submit" className='capital-submit-btn'>Submit</button>
      </form>
      </div>
    </div>
  );
};
 
export default PersonalDetails;
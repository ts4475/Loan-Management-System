import axios from 'axios';

const API_URL = 'http://localhost:8082/users';

class UserService {
  getAllUsers() {
    return axios.get(`${API_URL}/read`);
  }

  getUserById(id) {
    return axios.get(`${API_URL}/readOne/${id}`);
  }

  addUser(user) {
    return axios.post(`${API_URL}/register`, user);
  }

  updateUser(id, user) {
    return axios.put(`${API_URL}/update/${id}`, user);
  }

  deleteUser(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  login(user) {
    return axios.post(`${API_URL}/login`, user);
  }


sendOTP(emailDetails) {
  return axios.post(`${API_URL}/send-otp`, emailDetails);
}

verifyOTP(otpVerificationRequest) {
  return axios.post(`${API_URL}/verify-otp`, otpVerificationRequest);
}

getSecurityQuestion(emailDetails) {
  return axios.post(`${API_URL}/get-security-question`, emailDetails);
}

verifySecurityAnswer(securityAnswerRequest) {
  return axios.post(`${API_URL}/verify-security-answer`, securityAnswerRequest);
}

updatePassword(updatePasswordRequest) {
  return axios.put(`${API_URL}/update-password`, updatePasswordRequest);
}

loginOTPVerify(updatePasswordRequest) {
  return axios.post(`${API_URL}/login-otp`, updatePasswordRequest);
}
}


export default new UserService();


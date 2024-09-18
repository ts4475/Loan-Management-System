import axios from 'axios';

const API_URL = 'http://localhost:8083/loan-applications';

class LoanApplicationService {
  getAllApplications() {
    return axios.get(`${API_URL}/read`);
  }

  getApplicationById(id) {
    return axios.get(`${API_URL}/readOne/${id}`);
  }

  addApplication(application) {
    return axios.post(`${API_URL}/add`, application);
  }

  updateApplication(id, application) {
    return axios.put(`${API_URL}/update/${id}`, application);
  }

  deleteLoanApplication(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  updateApplicationStatus(id, status) {
    return axios.put(`${API_URL}/updateStatus/${id}`, null, {
      params: {
        status: status
      }
    });
  }
}

export default new LoanApplicationService();

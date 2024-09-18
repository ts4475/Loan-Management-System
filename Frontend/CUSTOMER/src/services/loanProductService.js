import axios from 'axios';

const API_URL = 'http://localhost:8084/loan-products';

class LoanProductService {
  getAllLoanProducts() {
    return axios.get(`${API_URL}/read`);
  }

  getLoanProductById(id) {
    return axios.get(`${API_URL}/readOne/${id}`);
  }

  addLoanProduct(product) {
    return axios.post(`${API_URL}/add`, product);
  }

  updateLoanProduct(id, product) {
    return axios.put(`${API_URL}/update/${id}`, product);
  }

  deleteLoanProduct(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
}

export default new LoanProductService();

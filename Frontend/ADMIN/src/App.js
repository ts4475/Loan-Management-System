import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Support from './components/Support';
import AddVendor from './components/AddVendor';
import UpdateVendor from './components/UpdateVendor';
import ShowVendors from './components/ShowVendors';
import Customer from './components/Customer';
import MyAccount from './components/MyAccount';
import AddLoanProducts from './components/AddLoanProduct';
import ActiveLoans from './components/ActiveLoans';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/support" element={<ProtectedRoute element={Support} />} />
        <Route path="/add-vendor" element={<ProtectedRoute element={AddVendor} />} />
        <Route path="/add-loan-products/:vendorId" element={<ProtectedRoute element={AddLoanProducts} />} />
        <Route path="/update-vendor" element={<ProtectedRoute element={UpdateVendor} />} />
        <Route path="/show-vendors" element={<ProtectedRoute element={ShowVendors} />} />
        <Route path="/active-loans" element={<ProtectedRoute element={ActiveLoans} />} />
        <Route path="/myaccount" element={<ProtectedRoute element={MyAccount} />} />
        <Route path="/customers" element={<ProtectedRoute element={Customer} />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import LoanApplicationService from '../services/loanApplicationService';
import { jsPDF } from 'jspdf';
import Navbar from './Navbar';

const Tracking6 = () => {
  const { user } = useContext(UserContext);
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [isBankDetailsVisible, setIsBankDetailsVisible] = useState(false);
  const [loan, setLoan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    LoanApplicationService.getApplicationById(application_id)
      .then(response => {
        setApplication(response.data);
        axios.get(`http://localhost:8084/loan-products/readOne/${response.data.product.product_id}`)
          .then(productResponse => {
            setProduct(productResponse.data);
          })
          .catch(error => {
            console.error('Error fetching product details', error);
          });
        axios.get(`http://localhost:8084/vendors/readOne/${response.data.vendor.vendor_id}`)
          .then(vendorResponse => {
            setVendor(vendorResponse.data);
          })
          .catch(error => {
            console.error('Error fetching vendor details', error);
          });
      })
      .catch(error => {
        console.error('Error fetching application details', error);
      });
  }, [application_id]);

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value
    });
  };

  const handleSaveBankDetails = () => {
    LoanApplicationService.updateApplicationStatus(application_id, 'Final')
      .then(() => {
        setApplication({ ...application, status: 'Final' });
        setIsBankDetailsVisible(false);
        // Call the backend to create the loan
        axios.post(`http://localhost:9191/api/loans/create/${application_id}`)
          .then(response => {
            setLoan(response.data);
            // Show success message or handle accordingly
          })
          .catch(error => {
            console.error('Error creating loan', error);
          });
      })
      .catch(error => {
        console.error('Error updating application status', error);
      });
  };

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
  
    // Add company name
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CAPITAL NEST', 105, 20, null, null, 'center');
  
    // Add header line
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30);
  
    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Loan Receipt', 105, 40, null, null, 'center');
  
    // Add application details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const details = [
      `Application ID: ${application.application_id}`,
      `Amount Required: ${application.amount_required}`,
      `Product Type: ${product.product_name}`,
      `Interest Rate: ${product.product_interest_rate}%`,
      `Processing Fee: ${product.product_processing_fee}`,
      `Vendor Name: ${vendor.vendor_name}`,
      `Tenure: ${application.tenure} years`,
      `EMI: ${calculateEMI(application.amount_required, product.product_interest_rate, application.tenure).toFixed(2)}`,
      `Bank Account: ${bankDetails.accountNumber}`,
      `IFSC Code: ${bankDetails.ifscCode}`,
      `Account Holder: ${bankDetails.accountHolderName}`,
      `Amount Credited: ${application.amount_required}`,
      `Transaction Date: ${new Date().toLocaleString()}`
    ];
  
    let yOffset = 60;
    details.forEach((detail) => {
      doc.text(detail, 10, yOffset);
      yOffset += 10;
    });
  
    // Add footer line
    doc.setLineWidth(0.5);
    doc.line(10, yOffset, 200, yOffset);
  
    // Add company contact information
    doc.setFontSize(10);
    doc.text('For any queries, contact us at support@capitalnest.com', 105, yOffset + 10, null, null, 'center');
    doc.text('Thank you for choosing Capital Nest!', 105, yOffset + 20, null, null, 'center');
  
    // Save the PDF
    doc.save('receipt.pdf');
  };




  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const numPayments = tenure * 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  if (!application || !product || !vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E7EEE1]">
      <Navbar />
      <br />
      <h2 className="text-2xl font-bold mb-6">Tracking 6 Page</h2>
      <div className="flex justify-between items-start mb-6 bg-[#B9D79F] p-4 rounded-lg w-full max-w-6xl">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mr-4">
          <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
          <p><strong>Application ID:</strong> {application.application_id}</p>
          <p><strong>Amount Required:</strong> {application.amount_required}</p>
          <p><strong>Product Type:</strong> {product.product_name}</p>
          <p><strong>Interest Rate:</strong> {product.product_interest_rate}%</p>
          <p><strong>Processing Fee:</strong> {product.product_processing_fee}</p>
          <p><strong>Prepayment Charges:</strong> {product.product_prepayment_charge}%</p>
          <p><strong>Prepayment Conditions:</strong> {product.product_prepayment_conditions}</p>
          <p><strong>Vendor Name:</strong> {vendor.vendor_name}</p>
          <p><strong>Vendor Logo:</strong> <img src={vendor.vendor_logo} alt={vendor.vendor_name} className="w-12 h-12 inline-block" /></p>
          <p><strong>Tenure:</strong> {application.tenure} years</p>
          <p><strong>EMI:</strong> ₹{calculateEMI(application.amount_required, product.product_interest_rate, application.tenure).toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h3 className="text-xl font-semibold mb-4">Application Status</h3>
          <p>Application Submitted (Submitted at {new Date(application.created_at).toLocaleString()})</p>
          <input type="radio" checked readOnly className="text-green-500" />
          <p>Documents Upload</p>
          <input type="radio" checked readOnly className="text-green-500" />
          <p>Document Verification Successful</p>
          <input type="radio" checked readOnly className="text-green-500" />
          <p>Loan Approved</p>
          {application.status === 'Final' ? (
            <>
              <input type="radio" checked readOnly className="text-green-500" />
              <p>Bank Account Added</p>
              <p>Amount Credited to Bank Account:</p>
              <p><strong>Bank Account:</strong> {bankDetails.accountNumber}</p>
              <p><strong>IFSC Code:</strong> {bankDetails.ifscCode}</p>
              <p><strong>Account Holder:</strong> {bankDetails.accountHolderName}</p>
              <button onClick={handleDownloadReceipt} className="bg-blue-500 text-white py-2 px-4 rounded">Download Receipt</button>
            </>
          ) : (
            <>
              <p>Bank Account Not Added</p>
              <p>Loan Amount Not Credited</p>
              <button onClick={() => setIsBankDetailsVisible(!isBankDetailsVisible)} className="bg-[#5F7A61] text-white py-2 px-4 rounded">Add Bank Account</button>
              {isBankDetailsVisible && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Account Number:</label>
                    <input type="text" name="accountNumber" value={bankDetails.accountNumber} onChange={handleBankDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">IFSC Code:</label>
                    <input type="text" name="ifscCode" value={bankDetails.ifscCode} onChange={handleBankDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Account Holder's Name:</label>
                    <input type="text" name="accountHolderName" value={bankDetails.accountHolderName} onChange={handleBankDetailsChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <button onClick={handleSaveBankDetails} className="bg-[#5F7A61] text-white py-2 px-4 rounded">Save</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between w-full max-w-6xl">
        <button onClick={handleGoBack} className="bg-gray-500 text-white py-2 px-4 rounded">Go Back to Dashboard</button>
      </div>
    </div>
  );
};

export default Tracking6;


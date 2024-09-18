// import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import './styles.css';
// import Gold from '../Photos/Features of loan.svg';

// const CustomerDashboard = () => {
//     const { user, logout } = useContext(UserContext);
//     const [userData, setUserData] = useState({});
//     const [loanApplications, setLoanApplications] = useState([]);
//     const [activeLoans, setActiveLoans] = useState([]);
//     const [paidOffLoans, setPaidOffLoans] = useState([]);
//     const [selectedLoan, setSelectedLoan] = useState(null);
//     const [paymentModalVisible, setPaymentModalVisible] = useState(false);
//     const [filteredActiveLoans, setFilteredActiveLoans] = useState([]);
//     const [filteredPaidOffLoans, setFilteredPaidOffLoans] = useState([]);
//     const [filtersActive, setFiltersActive] = useState({
//         startDate: '',
//         endDate: '',
//         loanManager: '',
//         vendor: ''
//     });
//     const [filtersPaidOff, setFiltersPaidOff] = useState({
//         startDate: '',
//         endDate: '',
//         loanManager: '',
//         vendor: ''
//     });
//     const [currentPageActive, setCurrentPageActive] = useState(1);
//     const [currentPagePaidOff, setCurrentPagePaidOff] = useState(1);
//     const itemsPerPage = 5;
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user.userId) {
//             axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
//                 .then(response => {
//                     setUserData(response.data);
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the user data!', error);
//                 });

//             axios.get('http://localhost:8083/loan-applications/read')
//                 .then(response => {
//                     const userApplications = response.data.filter(application => application.user.user_id === user.userId);
//                     setLoanApplications(userApplications);
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the loan applications!', error);
//                 });

//             axios.get(`http://localhost:9191/api/loans/customer/${user.userId}`)
//                 .then(response => {
//                     const loans = response.data;
//                     const detailedLoans = loans.map(async (loan) => {
//                         const managerResponse = await axios.get(`http://localhost:8084/managers/readOne/${loan.loanManagerId}`);
//                         const repaymentResponse = await axios.get(`http://localhost:9191/api/repayments/calculate-repayment-amount/${loan.id}`);
//                         loan.manager = managerResponse.data.user;
//                         loan.vendor = managerResponse.data.vendor;
//                         loan.totalRepaymentAmount = repaymentResponse.data;
//                         return loan;
//                     });
//                     Promise.all(detailedLoans).then(loans => {
//                         setActiveLoans(loans.filter(loan => loan.status === 'active'));
//                         setPaidOffLoans(loans.filter(loan => loan.status === 'paid_off'));
//                         setFilteredActiveLoans(loans.filter(loan => loan.status === 'active'));
//                         setFilteredPaidOffLoans(loans.filter(loan => loan.status === 'paid_off'));
//                     });
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the loans!', error);
//                 });
//         }
//     }, [user]);

//     useEffect(() => {
//         filterActiveLoans();
//     }, [filtersActive, activeLoans]);

//     useEffect(() => {
//         filterPaidOffLoans();
//     }, [filtersPaidOff, paidOffLoans]);

//     const handleApply = (loanType) => {
//         navigate(`/apply/${loanType}`);
//     };

//     const handleViewDetails = (applicationId, status) => {
//         const statusMap = {
//             'Application_Submitted': '/tracking1/',
//             'Submit_Docs': '/tracking2/',
//             'Docs_Submitted': '/tracking3/',
//             'Resubmit_Docs': '/tracking4/',
//             'Docs_Resubmitted': '/tracking5/',
//             'Loan_Approved': '/tracking6/',
//         };
//         navigate(statusMap[status] ? `${statusMap[status]}${applicationId}` : alert('This feature is currently under development.'));
//     };

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     const handlePayEMI = (loan) => {
//         setSelectedLoan(loan);
//         setPaymentModalVisible(true);
//     };

//     const handleRaiseQuery = (loanId, managerId) => {
//         navigate(`/support?loanId=${loanId}&managerId=${managerId}`);
//     };

//     const handleViewTransactions = (loanId) => {
//         navigate(`/transactions/${loanId}`);
//     };

//     const handleViewRepayments = (loanId) => {
//         navigate(`/repayments/${loanId}`);
//     };

//     // const generatePDF = (loan, data, type) => {
//     //     const doc = new jsPDF();
//     //     doc.text(`User: ${userData.first_name} ${userData.last_name}`, 10, 10);
//     //     doc.text(`Loan ID: ${loan.id}`, 10, 20);
//     //     doc.text(`Amount: ${loan.amount}`, 10, 30);
//     //     doc.text(`Interest Rate: ${loan.interestRate}`, 10, 40);
//     //     doc.text(`Repayable Amount: ${loan.repayableAmount}`, 10, 50);
//     //     doc.text(`Start Date: ${loan.startDate}`, 10, 60);
//     //     doc.text(`End Date: ${loan.endDate}`, 10, 70);

//     //     const headers = type === 'transactions'
//     //         ? ['Transaction ID', 'Amount', 'Type', 'Transaction Date']
//     //         : ['Repayment ID', 'Amount', 'Repayment Date', 'Status'];

//     //     const rows = data.map(item => type === 'transactions'
//     //         ? [item.id, item.amount, item.type, item.transactionDate]
//     //         : [item.id, item.amount, item.repaymentDate, item.status]
//     //     );

//     //     doc.autoTable({
//     //         startY: 80,
//     //         head: [headers],
//     //         body: rows,
//     //     });

//     //     doc.save(`${type}_loan_${loan.id}.pdf`);
//     // };

//     const handleFilterChange = (e, type) => {
//         const { name, value } = e.target;
//         if (type === 'active') {
//             setFiltersActive({
//                 ...filtersActive,
//                 [name]: value
//             });
//         } else {
//             setFiltersPaidOff({
//                 ...filtersPaidOff,
//                 [name]: value
//             });
//         }
//     };

//     const filterActiveLoans = () => {
//         const filteredActive = activeLoans.filter(loan => {
//             const matchesStartDate = filtersActive.startDate ? new Date(loan.startDate) >= new Date(filtersActive.startDate) : true;
//             const matchesEndDate = filtersActive.endDate ? new Date(loan.endDate) <= new Date(filtersActive.endDate) : true;
//             const matchesManager = filtersActive.loanManager ? (loan.manager.first_name + ' ' + loan.manager.last_name).toLowerCase().includes(filtersActive.loanManager.toLowerCase()) : true;
//             const matchesVendor = filtersActive.vendor ? loan.vendor.vendor_name.toLowerCase().includes(filtersActive.vendor.toLowerCase()) : true;
//             return matchesStartDate && matchesEndDate && matchesManager && matchesVendor;
//         });
//         setFilteredActiveLoans(filteredActive);
//     };

//     const filterPaidOffLoans = () => {
//         const filteredPaidOff = paidOffLoans.filter(loan => {
//             const matchesStartDate = filtersPaidOff.startDate ? new Date(loan.startDate) >= new Date(filtersPaidOff.startDate) : true;
//             const matchesEndDate = filtersPaidOff.endDate ? new Date(loan.endDate) <= new Date(filtersPaidOff.endDate) : true;
//             const matchesManager = filtersPaidOff.loanManager ? (loan.manager.first_name + ' ' + loan.manager.last_name).toLowerCase().includes(filtersPaidOff.loanManager.toLowerCase()) : true;
//             const matchesVendor = filtersPaidOff.vendor ? loan.vendor.vendor_name.toLowerCase().includes(filtersPaidOff.vendor.toLowerCase()) : true;
//             return matchesStartDate && matchesEndDate && matchesManager && matchesVendor;
//         });
//         setFilteredPaidOffLoans(filteredPaidOff);
//     };

//     const paginate = (items, pageNumber, itemsPerPage) => {
//         const startIndex = (pageNumber - 1) * itemsPerPage;
//         return items.slice(startIndex, startIndex + itemsPerPage);
//     };

//     const activeLoansPage = paginate(filteredActiveLoans, currentPageActive, itemsPerPage);
//     const paidOffLoansPage = paginate(filteredPaidOffLoans, currentPagePaidOff, itemsPerPage);

//     return (
//         <div className=" bg-[#E7EEE1] min-h-screen">
//             <Navbar />
//             <br/>
//             {userData.first_name && <h1 className="text-2xl fold-bold">Hello {userData.first_name}</h1>}
            
//             <div className="flex justify-around mt-8">
//                 <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
//                     <img src={Gold} alt="Home Loan" className="mb-4 mx-auto" />
//                     <h2 className="text-xl font-bold mb-2">Home Loan</h2>
//                     <p className="mb-4">Quick and easy Home Loans for your needs!</p>
//                     <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('home')}>Apply Now</button>
//                 </div>
//                 <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
//                     <img src={Gold} alt="Personal Loan" className="mb-4 mx-auto" />
//                     <h2 className="text-xl font-bold mb-2">Personal Loan</h2>
//                     <p className="mb-4">Quick and easy Personal Loans for your needs!</p>
//                     <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('personal')}>Apply Now</button>
//                 </div>
//                 <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
//                     <img src={Gold} alt="Gold Loan" className="mb-4 mx-auto" />
//                     <h2 className="text-xl font-bold mb-2">Gold Loan</h2>
//                     <p className="mb-4">Quick and easy Gold Loans for your needs!</p>
//                     <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('gold')}>Apply Now</button>
//                 </div>
//             </div>
//             <div style={{ marginTop: '40px' }}>
//                 <h2 className="text-2xl font-bold mb-4">Track Your Loan Application</h2>
//                 {loanApplications.length > 0 ? (
//                     <table className="min-w-full bg-white">
//                         <thead className="bg-[#5F7A61] text-white">
//                             <tr>
//                                 <th className="px-4 py-2">Application ID</th>
//                                 <th className="px-4 py-2">Product Type</th>
//                                 <th className="px-4 py-2">Amount Required</th>
//                                 <th className="px-4 py-2">Status</th>
//                                 <th className="px-4 py-2">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loanApplications.map(application => (
//                                 <tr key={application.application_id} className="border-b last:border-none hover:bg-gray-100">
//                                     <td className="px-4 py-2">{application.application_id}</td>
//                                     <td className="px-4 py-2">{application.product.product_name}</td>
//                                     <td className="px-4 py-2">{application.amount_required}</td>
//                                     <td className="px-4 py-2">{application.status}</td>
//                                     <td className="px-4 py-2">
//                                         <button onClick={() => handleViewDetails(application.application_id, application.status)} className="bg-[#5F7A61] text-white py-1 px-2 rounded">View Details</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="text-gray-600">No Active Applications</p>
//                 )}
//             </div>
//             <div style={{ marginTop: '40px' }}>
//                 <h2 className="text-2xl font-bold mb-4">Your Active Loans</h2>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Start Date:</label>
//                     <input type="date" name="startDate" value={filtersActive.startDate} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">End Date:</label>
//                     <input type="date" name="endDate" value={filtersActive.endDate} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Loan Manager:</label>
//                     <input type="text" name="loanManager" value={filtersActive.loanManager} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Vendor:</label>
//                     <input type="text" name="vendor" value={filtersActive.vendor} onChange={(e) => handleFilterChange(e, 'active')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 {filteredActiveLoans.length > 0 ? (
//                     <>
//                         <table className="min-w-full bg-white">
//                             <thead className="bg-[#5F7A61] text-white">
//                                 <tr>
//                                     <th className="px-4 py-2">Loan ID</th>
//                                     <th className="px-4 py-2">Amount</th>
//                                     <th className="px-4 py-2">Start Date</th>
//                                     <th className="px-4 py-2">End Date</th>
//                                     <th className="px-4 py-2">Interest Rate</th>
//                                     <th className="px-4 py-2">Repayable Amount</th>
//                                     <th className="px-4 py-2">Manager</th>
//                                     <th className="px-4 py-2">Vendor</th>
//                                     <th className="px-4 py-2">Total Repayment Amount</th>
//                                     <th className="px-4 py-2">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {activeLoansPage.map(loan => (
//                                     <tr key={loan.id} className="border-b last:border-none hover:bg-gray-100">
//                                         <td className="px-4 py-2">{loan.id}</td>
//                                         <td className="px-4 py-2">{loan.amount}</td>
//                                         <td className="px-4 py-2">{loan.startDate}</td>
//                                         <td className="px-4 py-2">{loan.endDate}</td>
//                                         <td className="px-4 py-2">{loan.interestRate}%</td>
//                                         <td className="px-4 py-2">{loan.repayableAmount}</td>
//                                         <td className="px-4 py-2">{loan.manager.first_name} {loan.manager.last_name}</td>
//                                         <td className="px-4 py-2">{loan.vendor.vendor_name}</td>
//                                         <td className="px-4 py-2">{loan.totalRepaymentAmount}</td>
//                                         <td className="px-4 py-2">
//                                             <button onClick={() => handleViewTransactions(loan.id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">View Transactions</button>
//                                             <button onClick={() => handlePayEMI(loan)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">Pay EMI</button>
//                                             <button onClick={() => handleRaiseQuery(loan.id, loan.manager.user_id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">Need Support</button>
//                                             <button onClick={() => handleViewRepayments(loan.id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">View Repayments</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <Pagination
//                             itemsPerPage={itemsPerPage}
//                             totalItems={filteredActiveLoans.length}
//                             paginate={setCurrentPageActive}
//                             currentPage={currentPageActive}
//                         />
//                     </>
//                 ) : (
//                     <p className="text-gray-600">No Active Loans</p>
//                 )}
//             </div>
//             <div style={{ marginTop: '40px' }}>
//                 <h2 className="text-2xl font-bold mb-4">Your Paid Off Loans</h2>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Start Date:</label>
//                     <input type="date" name="startDate" value={filtersPaidOff.startDate} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">End Date:</label>
//                     <input type="date" name="endDate" value={filtersPaidOff.endDate} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Loan Manager:</label>
//                     <input type="text" name="loanManager" value={filtersPaidOff.loanManager} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Vendor:</label>
//                     <input type="text" name="vendor" value={filtersPaidOff.vendor} onChange={(e) => handleFilterChange(e, 'paid_off')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>
//                 {filteredPaidOffLoans.length > 0 ? (
//                     <>
//                         <table className="min-w-full bg-white">
//                             <thead className="bg-[#5F7A61] text-white">
//                                 <tr>
//                                     <th className="px-4 py-2">Loan ID</th>
//                                     <th className="px-4 py-2">Amount</th>
//                                     <th className="px-4 py-2">Start Date</th>
//                                     <th className="px-4 py-2">End Date</th>
//                                     <th className="px-4 py-2">Interest Rate</th>
//                                     <th className="px-4 py-2">Repayable Amount</th>
//                                     <th className="px-4 py-2">Manager</th>
//                                     <th className="px-4 py-2">Vendor</th>
//                                     <th className="px-4 py-2">Total Repayment Amount</th>
//                                     <th className="px-4 py-2">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paidOffLoansPage.map(loan => (
//                                     <tr key={loan.id} className="border-b last:border-none hover:bg-gray-100">
//                                         <td className="px-4 py-2">{loan.id}</td>
//                                         <td className="px-4 py-2">{loan.amount}</td>
//                                         <td className="px-4 py-2">{loan.startDate}</td>
//                                         <td className="px-4 py-2">{loan.endDate}</td>
//                                         <td className="px-4 py-2">{loan.interestRate}%</td>
//                                         <td className="px-4 py-2">{loan.repayableAmount}</td>
//                                         <td className="px-4 py-2">{loan.manager.first_name} {loan.manager.last_name}</td>
//                                         <td className="px-4 py-2">{loan.vendor.vendor_name}</td>
//                                         <td className="px-4 py-2">{loan.totalRepaymentAmount}</td>
//                                         <td className="px-4 py-2">
//                                             <button onClick={() => handleViewTransactions(loan.id)} className="bg-[#5F7A61] text-white py-1 px-2 rounded mb-1">View Transactions</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <Pagination
//                             itemsPerPage={itemsPerPage}
//                             totalItems={filteredPaidOffLoans.length}
//                             paginate={setCurrentPagePaidOff}
//                             currentPage={currentPagePaidOff}
//                         />
//                     </>
//                 ) : (
//                     <p className="text-gray-600">No Paid Off Loans</p>
//                 )}
//             </div>
//             {paymentModalVisible && (
//                 <PaymentModal
//                     loan={selectedLoan}
//                     onClose={() => setPaymentModalVisible(false)}
//                 />
//             )}
//         </div>
//     );
// };

// const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <nav>
//             <ul className="pagination">
//                 {pageNumbers.map(number => (
//                     <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
//                         <a onClick={() => paginate(number)} href="#!" className="page-link">
//                             {number}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// };

// const PaymentModal = ({ loan, onClose }) => {
//     const [paymentOption, setPaymentOption] = useState('');
//     const [bankDetails, setBankDetails] = useState({});
//     const [cardDetails, setCardDetails] = useState({});
//     const [upiId, setUpiId] = useState('');
//     const [paymentSuccess, setPaymentSuccess] = useState(false);
//     const [lateFee, setLateFee] = useState(loan.lateFee);
//     const [prePaymentFee, setPrePaymentFee] = useState(loan.prePaymentFee);
//     const [monthlyPayments, setMonthlyPayments] = useState(0);
//     const [isFormValid, setIsFormValid] = useState(false);

//     useEffect(() => {
//         const currentDate = new Date();
//         const isBeforeTenth = currentDate.getDate() <= 10;
       
//         // Calculate the number of payments made in the current month
//         const paymentsInMonth = loan.repayments.filter(repayment => {
//             const repaymentDate = new Date(repayment.repaymentDate);
//             return repaymentDate.getMonth() === currentDate.getMonth() && repaymentDate.getFullYear() === currentDate.getFullYear();
//         }).length;

//         setMonthlyPayments(paymentsInMonth);

//         if (isBeforeTenth) {
//             setLateFee(0);
//         }

//         if (paymentsInMonth === 0) {
//             setPrePaymentFee(0);
//         } else if (paymentsInMonth > 0) {
//             setPrePaymentFee(loan.prePaymentFee);
//         }
//     }, [loan]);

//     useEffect(() => {
//         const validateForm = () => {
//             if (paymentOption === 'bank') {
//                 if (bankDetails.type === 'new') {
//                     return bankDetails.accountNumber && bankDetails.bankName && bankDetails.ifscCode;
//                 } else if (bankDetails.type === 'existing') {
//                     return true;
//                 }
//             } else if (paymentOption === 'card') {
//                 return cardDetails.number && cardDetails.expiry && cardDetails.name && cardDetails.cvv;
//             } else if (paymentOption === 'upi') {
//                 return upiId;
//             }
//             return false;
//         };
//         setIsFormValid(validateForm());
//     }, [paymentOption, bankDetails, cardDetails, upiId]);

//     const handlePayment = () => {
//         const paymentDetails = {
//             lateFee,
//             prePaymentFee,
//             // Include other necessary payment details here
//         };

//         // Depending on the paymentOption, collect the necessary details
//         if (paymentOption === 'bank') {
//             // Add bank details to paymentDetails
//         } else if (paymentOption === 'card') {
//             // Add card details to paymentDetails
//         } else if (paymentOption === 'upi') {
//             // Add UPI ID to paymentDetails
//         }

//         axios.post(`http://localhost:9191/api/repayments/${loan.id}`, paymentDetails)
//             .then(response => {
//                 setPaymentSuccess(true);
//             })
//             .catch(error => {
//                 console.error('Payment failed!', error);
//             });
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//                 <span className="absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
//                 {paymentSuccess ? (
//                     <div>
//                         <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Payment Successful</h2>
//                         <p className="mb-4">Your payment has been processed successfully.</p>
//                         <button onClick={onClose} className="bg-[#5F7A61] text-white py-2 px-4 rounded">Close</button>
//                     </div>
//                 ) : (
//                     <div>
//                         <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Pay EMI for Loan ID: {loan.id}</h2>
//                         <p className="mb-2"><span className="font-semibold">EMI Amount:</span> {loan.emiamount}</p>
//                         <p className="mb-2"><span className="font-semibold">Late Fee:</span> {lateFee}</p>
//                         <p className="mb-2"><span className="font-semibold">Prepayment Fee:</span> {prePaymentFee}</p>
//                         <label className="block mb-2">
//                             <span className="text-gray-700">Payment Option:</span>
//                             <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
//                                 <option value="">Select...</option>
//                                 <option value="bank">Bank Transfer</option>
//                                 <option value="card">Debit/Credit Card</option>
//                                 <option value="upi">UPI</option>
//                             </select>
//                         </label>
//                         {paymentOption === 'bank' && (
//                             <div>
//                                 <h3 className="text-lg font-bold mb-2 text-[#5F7A61]">Bank Transfer</h3>
//                                 <label className="block mb-2">
//                                     <input type="radio" name="bank" value="new" onChange={(e) => setBankDetails({ ...bankDetails, type: 'new' })} className="mr-2" /> New Bank Account
//                                 </label>
//                                 <label className="block mb-2">
//                                     <input type="radio" name="bank" value="existing" onChange={(e) => setBankDetails({ ...bankDetails, type: 'existing' })} className="mr-2" /> Existing Bank Account
//                                 </label>
//                                 {bankDetails.type === 'new' && (
//                                     <div>
//                                         <label className="block mb-2">
//                                             <span className="text-gray-700">Bank Account Number:</span>
//                                             <input type="text" onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                         </label>
//                                         <label className="block mb-2">
//                                             <span className="text-gray-700">Bank Name:</span>
//                                             <input type="text" onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                         </label>
//                                         <label className="block mb-2">
//                                             <span className="text-gray-700">IFSC Code:</span>
//                                             <input type="text" onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                         </label>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                         {paymentOption === 'card' && (
//                             <div>
//                                 <h3 className="text-lg font-bold mb-2 text-[#5F7A61]">Card Payment</h3>
//                                 <label className="block mb-2">
//                                     <span className="text-gray-700">Card Number:</span>
//                                     <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                 </label>
//                                 <label className="block mb-2">
//                                     <span className="text-gray-700">Expiry Date:</span>
//                                     <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                 </label>
//                                 <label className="block mb-2">
//                                     <span className="text-gray-700">Cardholder Name:</span>
//                                     <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                 </label>
//                                 <label className="block mb-2">
//                                     <span className="text-gray-700">CVV:</span>
//                                     <input type="text" onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                 </label>
//                             </div>
//                         )}
//                         {paymentOption === 'upi' && (
//                             <div>
//                                 <h3 className="text-lg font-bold mb-2 text-[#5F7A61]">UPI Payment</h3>
//                                 <label className="block mb-2">
//                                     <span className="text-gray-700">UPI ID:</span>
//                                     <input type="text" onChange={(e) => setUpiId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                                 </label>
//                             </div>
//                         )}
//                         <button onClick={handlePayment} disabled={!isFormValid} className={`w-full py-2 px-4 rounded mt-4 font-semibold text-white ${isFormValid ? 'bg-[#5F7A61] hover:bg-[#4e6751]' : 'bg-gray-400 cursor-not-allowed'}`}>Pay</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomerDashboard;
// import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import ActiveLoans from './ActiveLoans';
// import ClosedLoans from './ClosedLoans';
// import PaymentModal from './PaymentModal';
// import './styles.css';
// import Gold from '../Photos/Features of loan.svg';

// const CustomerDashboard = () => {
//     const { user, logout } = useContext(UserContext);
//     const [userData, setUserData] = useState({});
//     const [loanApplications, setLoanApplications] = useState([]);
//     const [activeLoans, setActiveLoans] = useState([]);
//     const [paidOffLoans, setPaidOffLoans] = useState([]);
//     const [selectedLoan, setSelectedLoan] = useState(null);
//     const [paymentModalVisible, setPaymentModalVisible] = useState(false);
//     const [filtersActive, setFiltersActive] = useState({
//         startDate: '',
//         endDate: '',
//         loanManager: '',
//         vendor: ''
//     });
//     const [filtersPaidOff, setFiltersPaidOff] = useState({
//         startDate: '',
//         endDate: '',
//         loanManager: '',
//         vendor: ''
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user.userId) {
//             axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
//                 .then(response => {
//                     setUserData(response.data);
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the user data!', error);
//                 });

//             axios.get('http://localhost:8083/loan-applications/read')
//                 .then(response => {
//                     const userApplications = response.data.filter(application => application.user.user_id === user.userId);
//                     setLoanApplications(userApplications);
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the loan applications!', error);
//                 });

//             axios.get(`http://localhost:9191/api/loans/customer/${user.userId}`)
//                 .then(response => {
//                     const loans = response.data;
//                     const detailedLoans = loans.map(async (loan) => {
//                         const managerResponse = await axios.get(`http://localhost:8084/managers/readOne/${loan.loanManagerId}`);
//                         const repaymentResponse = await axios.get(`http://localhost:9191/api/repayments/calculate-repayment-amount/${loan.id}`);
//                         loan.manager = managerResponse.data.user;
//                         loan.vendor = managerResponse.data.vendor;
//                         loan.totalRepaymentAmount = repaymentResponse.data;
//                         return loan;
//                     });
//                     Promise.all(detailedLoans).then(loans => {
//                         setActiveLoans(loans.filter(loan => loan.status === 'active'));
//                         setPaidOffLoans(loans.filter(loan => loan.status === 'paid_off'));
//                     });
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the loans!', error);
//                 });
//         }
//     }, [user]);

//     const handleApply = (loanType) => {
//         navigate(`/apply/${loanType}`);
//     };

//     const handleViewDetails = (applicationId, status) => {
//         const statusMap = {
//             'Application_Submitted': '/tracking1/',
//             'Submit_Docs': '/tracking2/',
//             'Docs_Submitted': '/tracking3/',
//             'Resubmit_Docs': '/tracking4/',
//             'Docs_Resubmitted': '/tracking5/',
//             'Loan_Approved': '/tracking6/',
//         };
//         navigate(statusMap[status] ? `${statusMap[status]}${applicationId}` : alert('This feature is currently under development.'));
//     };

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     const handlePayEMI = (loan) => {
//         setSelectedLoan(loan);
//         setPaymentModalVisible(true);
//     };

//     const handleRaiseQuery = (loanId, managerId) => {
//         navigate(`/support?loanId=${loanId}&managerId=${managerId}`);
//     };

//     const handleViewTransactions = (loanId) => {
//         navigate(`/transactions/${loanId}`);
//     };

//     const handleViewRepayments = (loanId) => {
//         navigate(`/repayments/${loanId}`);
//     };

//     const handleFilterChange = (e, type) => {
//         const { name, value } = e.target;
//         if (type === 'active') {
//             setFiltersActive({
//                 ...filtersActive,
//                 [name]: value
//             });
//         } else {
//             setFiltersPaidOff({
//                 ...filtersPaidOff,
//                 [name]: value
//             });
//         }
//     };

//     return (
//         <div className=" bg-[#E7EEE1] min-h-screen">
//             <Navbar />
//             <br/>
//             {userData.first_name && <h1 className="text-2xl fold-bold">Hello {userData.first_name}</h1>}
            
//             <div className="flex justify-around mt-8">
//                 <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
//                     <img src={Gold} alt="Home Loan" className="mb-4 mx-auto" />
//                     <h2 className="text-xl font-bold mb-2">Home Loan</h2>
//                     <p className="mb-4">Quick and easy Home Loans for your needs!</p>
//                     <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('home')}>Apply Now</button>
//                 </div>
//                 <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
//                     <img src={Gold} alt="Personal Loan" className="mb-4 mx-auto" />
//                     <h2 className="text-xl font-bold mb-2">Personal Loan</h2>
//                     <p className="mb-4">Quick and easy Personal Loans for your needs!</p>
//                     <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('personal')}>Apply Now</button>
//                 </div>
//                 <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
//                     <img src={Gold} alt="Gold Loan" className="mb-4 mx-auto" />
//                     <h2 className="text-xl font-bold mb-2">Gold Loan</h2>
//                     <p className="mb-4">Quick and easy Gold Loans for your needs!</p>
//                     <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('gold')}>Apply Now</button>
//                 </div>
//             </div>
//             <div style={{ marginTop: '40px' }}>
//                 <h2 className="text-2xl font-bold mb-4">Track Your Loan Application</h2>
//                 {loanApplications.length > 0 ? (
//                     <table className="min-w-full bg-white">
//                         <thead className="bg-[#5F7A61] text-white">
//                             <tr>
//                                 <th className="px-4 py-2">Application ID</th>
//                                 <th className="px-4 py-2">Product Type</th>
//                                 <th className="px-4 py-2">Amount Required</th>
//                                 <th className="px-4 py-2">Status</th>
//                                 <th className="px-4 py-2">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loanApplications.map(application => (
//                                 <tr key={application.application_id} className="border-b last:border-none hover:bg-gray-100">
//                                     <td className="px-4 py-2">{application.application_id}</td>
//                                     <td className="px-4 py-2">{application.product.product_name}</td>
//                                     <td className="px-4 py-2">{application.amount_required}</td>
//                                     <td className="px-4 py-2">{application.status}</td>
//                                     <td className="px-4 py-2">
//                                         <button onClick={() => handleViewDetails(application.application_id, application.status)} className="bg-[#5F7A61] text-white py-1 px-2 rounded">View Details</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="text-gray-600">No Active Applications</p>
//                 )}
//             </div>
//             <ActiveLoans
//                 activeLoans={activeLoans}
//                 filtersActive={filtersActive}
//                 handleFilterChange={handleFilterChange}
//                 handleViewTransactions={handleViewTransactions}
//                 handlePayEMI={handlePayEMI}
//                 handleRaiseQuery={handleRaiseQuery}
//                 handleViewRepayments={handleViewRepayments}
//             />
//             <ClosedLoans
//                 paidOffLoans={paidOffLoans}
//                 filtersPaidOff={filtersPaidOff}
//                 handleFilterChange={handleFilterChange}
//                 handleViewTransactions={handleViewTransactions}
//             />
//             {paymentModalVisible && (
//                 <PaymentModal
//                     loan={selectedLoan}
//                     onClose={() => setPaymentModalVisible(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default CustomerDashboard;
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ActiveLoans from './ActiveLoans';
import ClosedLoans from './ClosedLoans';
import PaymentModal from './PaymentModal';
import './styles.css';
import Gold from '../Photos/Features of loan.svg';

const CustomerDashboard = () => {
    const { user, logout } = useContext(UserContext);
    const [userData, setUserData] = useState({});
    const [loanApplications, setLoanApplications] = useState([]);
    const [activeLoans, setActiveLoans] = useState([]);
    const [paidOffLoans, setPaidOffLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [filtersActive, setFiltersActive] = useState({
        startDate: '',
        endDate: '',
        loanManager: '',
        vendor: ''
    });
    const [filtersPaidOff, setFiltersPaidOff] = useState({
        startDate: '',
        endDate: '',
        loanManager: '',
        vendor: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user.userId) {
            axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the user data!', error);
                });

            axios.get('http://localhost:8083/loan-applications/read')
                .then(response => {
                    const userApplications = response.data.filter(application => application.user.user_id === user.userId);
                    setLoanApplications(userApplications);
                })
                .catch(error => {
                    console.error('There was an error fetching the loan applications!', error);
                });

            axios.get(`http://localhost:9191/api/loans/customer/${user.userId}`)
                .then(response => {
                    const loans = response.data;
                    const detailedLoans = loans.map(async (loan) => {
                        const managerResponse = await axios.get(`http://localhost:8084/managers/readOne/${loan.loanManagerId}`);
                        const repaymentResponse = await axios.get(`http://localhost:9191/api/repayments/calculate-repayment-amount/${loan.id}`);
                        loan.manager = managerResponse.data.user;
                        loan.vendor = managerResponse.data.vendor;
                        loan.totalRepaymentAmount = repaymentResponse.data;
                        return loan;
                    });
                    Promise.all(detailedLoans).then(loans => {
                        setActiveLoans(loans.filter(loan => loan.status === 'active'));
                        setPaidOffLoans(loans.filter(loan => loan.status === 'paid_off'));
                    });
                })
                .catch(error => {
                    console.error('There was an error fetching the loans!', error);
                });
        }
    }, [user]);

    const handleApply = (loanType) => {
        navigate(`/apply/${loanType}`);
    };

    const handleViewDetails = (applicationId, status) => {
        const statusMap = {
            'Application_Submitted': '/tracking1/',
            'Submit_Docs': '/tracking2/',
            'Docs_Submitted': '/tracking3/',
            'Resubmit_Docs': '/tracking4/',
            'Docs_Resubmitted': '/tracking5/',
            'Loan_Approved': '/tracking6/',
        };
        navigate(statusMap[status] ? `${statusMap[status]}${applicationId}` : alert('This feature is currently under development.'));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handlePayEMI = (loan) => {
        setSelectedLoan(loan);
        setPaymentModalVisible(true);
    };

    const handleRaiseQuery = (loanId, managerId) => {
        navigate(`/support?loanId=${loanId}&managerId=${managerId}`);
    };

    const handleViewTransactions = (loanId) => {
        navigate(`/transactions/${loanId}`);
    };

    const handleViewRepayments = (loanId) => {
        navigate(`/repayments/${loanId}`);
    };

    const handleFilterChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'active') {
            setFiltersActive({
                ...filtersActive,
                [name]: value
            });
        } else {
            setFiltersPaidOff({
                ...filtersPaidOff,
                [name]: value
            });
        }
    };

    return (
        <div className=" bg-[#E7EEE1] min-h-screen">
            <Navbar />
            <br/>
            {userData.first_name && <h1 className="text-2xl fold-bold">Hello {userData.first_name}</h1>}
            
            <div className="flex justify-around mt-8">
                <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
                    <img src={Gold} alt="Home Loan" className="mb-4 mx-auto" />
                    <h2 className="text-xl font-bold mb-2">Home Loan</h2>
                    <p className="mb-4">Quick and easy Home Loans for your needs!</p>
                    <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('home')}>Apply Now</button>
                </div>
                <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
                    <img src={Gold} alt="Personal Loan" className="mb-4 mx-auto" />
                    <h2 className="text-xl font-bold mb-2">Personal Loan</h2>
                    <p className="mb-4">Quick and easy Personal Loans for your needs!</p>
                    <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('personal')}>Apply Now</button>
                </div>
                <div className="card bg-[#EEF4ED] p-4 rounded-lg shadow-lg text-center">
                    <img src={Gold} alt="Gold Loan" className="mb-4 mx-auto" />
                    <h2 className="text-xl font-bold mb-2">Gold Loan</h2>
                    <p className="mb-4">Quick and easy Gold Loans for your needs!</p>
                    <button className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-1" onClick={() => handleApply('gold')}>Apply Now</button>
                </div>
            </div>
            <div style={{ marginTop: '40px' }}>
    <h2 className="text-2xl font-bold mb-4">Track Your Loan Application</h2>
    {loanApplications.length > 0 ? (
        <table className="min-w-full bg-white">
            <thead className="bg-[#5F7A61] text-white">
                <tr>
                    <th className="px-4 py-2 w-1/5 text-left">Application ID</th>
                    <th className="px-4 py-2 w-1/5 text-left">Product Type</th>
                    <th className="px-4 py-2 w-1/5 text-left">Amount Required</th>
                    <th className="px-4 py-2 w-1/5 text-left">Status</th>
                    <th className="px-4 py-2 w-1/5 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                {loanApplications.map(application => (
                    <tr key={application.application_id} className="border-b last:border-none hover:bg-gray-100">
                        <td className="px-4 py-2 w-1/5 text-left">{application.application_id}</td>
                        <td className="px-4 py-2 w-1/5 text-left">{application.product.product_name}</td>
                        <td className="px-4 py-2 w-1/5 text-left">{application.amount_required}</td>
                        <td className="px-4 py-2 w-1/5 text-left">{application.status}</td>
                        <td className="px-4 py-2 w-1/5 text-left">
                            <button onClick={() => handleViewDetails(application.application_id, application.status)} className="bg-[#5F7A61] text-white py-1 px-2 rounded">View Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p className="text-gray-600">No Active Applications</p>
    )}
</div>

            <ActiveLoans
                activeLoans={activeLoans}
                filtersActive={filtersActive}
                handleFilterChange={handleFilterChange}
                handleViewTransactions={handleViewTransactions}
                handlePayEMI={handlePayEMI}
                handleRaiseQuery={handleRaiseQuery}
                handleViewRepayments={handleViewRepayments}
            />
            <ClosedLoans
                paidOffLoans={paidOffLoans}
                filtersPaidOff={filtersPaidOff}
                handleFilterChange={handleFilterChange}
                handleViewTransactions={handleViewTransactions}
            />
            {paymentModalVisible && (
                <PaymentModal
                    loan={selectedLoan}
                    onClose={() => setPaymentModalVisible(false)}
                />
            )}
        </div>
    );
};

export default CustomerDashboard;

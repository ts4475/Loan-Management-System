// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import LoanApplicationService from '../services/loanApplicationService';
// import axios from 'axios';

// // const ApplicationSubmission = () => {
// //   const { user } = useContext(UserContext);
// //   const navigate = useNavigate();
// //   const [consent, setConsent] = useState(false);

//   // const handleSubmit = () => {
//   //   if (consent) {
//   //     axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
//   //       .then(response => {
//   //         const userData = response.data;
//   //         const applicationData = {
//   //           user_id: user.userId,
//   //           amount_required: user.requestedLoanAmount,
//   //           tenure: user.tenure,
//   //           product_id: user.selectedOffer.product_id,
//   //           product_name: user.selectedOffer.product_name,
//   //           vendor_id: user.selectedOffer.vendor.vendor_id,
//   //           status: 'Application_Submitted',
//   //           review_message: '',
//   //         };

//   //         console.log('Submitting application with data:', applicationData);

//   //         LoanApplicationService.addApplication(applicationData)
//   //           .then(() => {
//   //             alert('Your Loan Application has been submitted successfully. Redirecting to Dashboard in 10 seconds.');
//   //             setTimeout(() => {
//   //               navigate('/dashboard');
//   //             }, 10000);
//   //           })
//   //           .catch((error) => {
//   //             console.error('There was an error submitting the application!', error);
//   //           });
//   //       })
//   //       .catch(error => {
//   //         console.error('There was an error fetching the user data!', error);
//   //       });
//   //   }
//   // };

//   const ApplicationSubmission = () => {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [consent, setConsent] = useState(false);
  
//     const handleSubmit = () => {
//       if (consent) {
//         axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
//           .then(response => {
//             const userData = response.data;
//             const applicationData = {
//               user_id: user.userId,
//               amount_required: user.requestedLoanAmount,
//               tenure: user.tenure,
//               product_id: user.selectedOffer.product_id,
//               product_name: user.selectedOffer.product_name,
//               vendor_id: user.selectedOffer.vendor.vendor_id,
//               status: 'Application_Submitted',
//               review_message: '',
//             };
  
//             LoanApplicationService.addApplication(applicationData)
//               .then(() => {
//                 // Send notification
//                 const notificationData = {
//                   userId: user.userId,
//                   notificationBody: `Your Application for ${user.selectedOffer.product_name} from ${user.selectedOffer.vendor.vendor_name} is submitted successfully at ${new Date().toLocaleString()}.`,
//                   status: 'OPEN',
//                 };
  
//                 axios.post('http://localhost:8086/notifications/add', notificationData)
//                   .then(() => {
//                     console.log('Notification added successfully');
//                   })
//                   .catch((error) => {
//                     console.error('There was an error adding the notification!', error);
//                   });
  
  
//                 alert('Your Loan Application has been submitted successfully. Redirecting to Dashboard in 10 seconds.');
//                 setTimeout(() => {
//                   navigate('/dashboard');
//                 }, 10000);
//               })
//               .catch((error) => {
//                 console.error('There was an error submitting the application!', error);
//               });
//           })
//           .catch(error => {
//             console.error('There was an error fetching the user data!', error);
//           });
//       }
//     };

 
  


//   return (
//     <div>
//       <h2>Application Submission</h2>
//       <div>
//         <h3>Loan Details</h3>
//         <p>Product Name: {user.selectedOffer.product_name}</p>
//         <p>Requested Loan Amount: {user.requestedLoanAmount}</p>
//         <p>Tenure: {user.tenure} years</p>
//         <p>Vendor: {user.selectedOffer.vendor.vendor_name}</p>
//         <p>Interest Rate: {user.selectedOffer.product_interest_rate}%</p>
//         <p>Processing Fee: {user.selectedOffer.product_processing_fee}</p>
//         <p>EMI: {user.selectedOffer.emi}</p>
//         <p>Chances of Approval: {user.selectedOffer.chancesOfApproval}</p>
//         <p>Prepayment Charges: {user.selectedOffer.product_prepayment_charge}%</p>
//         <p>Prepayment Conditions: {user.selectedOffer.product_prepayment_conditions}</p>
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           checked={consent}
//           onChange={() => setConsent(!consent)}
//         />
//         <label>
//           By Submitting, I provide my consent to retrieve my Credit Information
//           from bureaus including CIBIL, to check eligibility for this application.
//           I understand that this may impact my credit score.
//         </label>
//       </div>
//       <button onClick={handleSubmit} disabled={!consent}>
//         Submit Application
//       </button>
//     </div>
//   );
// };

// export default ApplicationSubmission;

// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import LoanApplicationService from '../services/loanApplicationService';
// import Navbar from './Navbar';
// import axios from 'axios';

// const ApplicationSubmission = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [consent, setConsent] = useState(false);

//   const handleSubmit = () => {
//       if (consent) {
//         axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
//           .then(response => {
//             const userData = response.data;
//             const applicationData = {
//               user_id: user.userId,
//               amount_required: user.requestedLoanAmount,
//               tenure: user.tenure,
//               product_id: user.selectedOffer.product_id,
//               product_name: user.selectedOffer.product_name,
//               vendor_id: user.selectedOffer.vendor.vendor_id,
//               status: 'Application_Submitted',
//               review_message: '',
//             };
  
//             LoanApplicationService.addApplication(applicationData)
//               .then(() => {
//                 // Send notification
//                 const notificationData = {
//                   userId: user.userId,
//                   notificationBody: `Your Application for ${user.selectedOffer.product_name} from ${user.selectedOffer.vendor.vendor_name} is submitted successfully at ${new Date().toLocaleString()}.`,
//                   status: 'OPEN',
//                 };
  
//                 axios.post('http://localhost:8086/notifications/add', notificationData)
//                   .then(() => {
//                     console.log('Notification added successfully');
//                   })
//                   .catch((error) => {
//                     console.error('There was an error adding the notification!', error);
//                   });
  
  
//                 alert('Your Loan Application has been submitted successfully. Redirecting to Dashboard in 10 seconds.');
//                 setTimeout(() => {
//                   navigate('/dashboard');
//                 }, 10000);
//               })
//               .catch((error) => {
//                 console.error('There was an error submitting the application!', error);
//               });
//           })
//           .catch(error => {
//             console.error('There was an error fetching the user data!', error);
//           });
//       }
//     };

//   return (
//     <div className="p-6 bg-[#E7EEE1] min-h-screen">
//       <Navbar/>
//       <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Application Submission</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6 bg-[#B9D79F]">
//         <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
//         <p className="mb-2"><span className="font-semibold">Product Name:</span> {user.selectedOffer.product_name}</p>
//         <p className="mb-2"><span className="font-semibold">Requested Loan Amount:</span> {user.requestedLoanAmount}</p>
//         <p className="mb-2"><span className="font-semibold">Tenure:</span> {user.tenure} years</p>
//         <p className="mb-2"><span className="font-semibold">Vendor:</span> {user.selectedOffer.vendor.vendor_name}</p>
//         <p className="mb-2"><span className="font-semibold">Interest Rate:</span> {user.selectedOffer.product_interest_rate}%</p>
//         <p className="mb-2"><span className="font-semibold">Processing Fee:</span> {user.selectedOffer.product_processing_fee}</p>
//         <p className="mb-2"><span className="font-semibold">EMI:</span> {user.selectedOffer.emi}</p>
//         <p className="mb-2"><span className="font-semibold">Chances of Approval:</span> {user.selectedOffer.chancesOfApproval}</p>
//         <p className="mb-2"><span className="font-semibold">Prepayment Charges:</span> {user.selectedOffer.product_prepayment_charge}%</p>
//         <p className="mb-2"><span className="font-semibold">Prepayment Conditions:</span> {user.selectedOffer.product_prepayment_conditions}</p>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={consent}
//             onChange={() => setConsent(!consent)}
//             className="form-checkbox h-5 w-5 text-[#5F7A61]"
//           />
//           <label className="ml-2 text-gray-700">
//             By Submitting, I provide my consent to retrieve my Credit Information
//             from bureaus including CIBIL, to check eligibility for this application.
//             I understand that this may impact my credit score.
//           </label>
//         </div>
//       </div>
//       <button
//         onClick={handleSubmit}
//         disabled={!consent}
//         className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${consent ? 'bg-[#5F7A61] hover:bg-[#4e6751]' : 'bg-gray-400 cursor-not-allowed'}`}
//       >
//         Submit Application
//       </button>
//     </div>
//   );
// };

// export default ApplicationSubmission;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoanApplicationService from '../services/loanApplicationService';
import axios from 'axios';
import Navbar from './Navbar';

const ApplicationSubmission = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);

  const handleSubmit = () => {
    if (consent) {
      axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
        .then(response => {
          const userData = response.data;
          const applicationData = {
            user_id: user.userId,
            amount_required: user.requestedLoanAmount,
            tenure: user.tenure,
            product_id: user.selectedOffer.product_id,
            product_name: user.selectedOffer.product_name,
            vendor_id: user.selectedOffer.vendor.vendor_id,
            status: 'Application_Submitted',
            review_message: '',
          };

          console.log('Submitting application with data:', applicationData);

          LoanApplicationService.addApplication(applicationData)
            .then(() => {
              // Send notification
              const notificationData = {
                userId: user.userId,
                notificationBody: `Your Application for ${user.selectedOffer.product_name} from ${user.selectedOffer.vendor.vendor_name} is submitted successfully at ${new Date().toLocaleString()}.`,
                status: 'OPEN',
              };

              axios.post('http://localhost:8086/notifications/add', notificationData)
                .then(() => {
                  console.log('Notification added successfully');
                })
                .catch((error) => {
                  console.error('There was an error adding the notification!', error);
                });

              alert('Your Loan Application has been submitted successfully. Redirecting to Dashboard in 10 seconds.');
              setTimeout(() => {
                navigate('/dashboard');
              }, 10000);
            })
            .catch((error) => {
              console.error('There was an error submitting the application!', error);
            });
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
        });
    }
  };

  return (
    <div className=" bg-[#E7EEE1] min-h-screen">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Application Submission</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 bg-[#B9D79F]">
        <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
        <p className="mb-2"><span className="font-semibold">Product Name:</span> {user.selectedOffer.product_name}</p>
        <p className="mb-2"><span className="font-semibold">Requested Loan Amount:</span> {user.requestedLoanAmount}</p>
        <p className="mb-2"><span className="font-semibold">Tenure:</span> {user.tenure} years</p>
        <p className="mb-2"><span className="font-semibold">Vendor:</span> {user.selectedOffer.vendor.vendor_name}</p>
        <p className="mb-2"><span className="font-semibold">Interest Rate:</span> {user.selectedOffer.product_interest_rate}%</p>
        <p className="mb-2"><span className="font-semibold">Processing Fee:</span> {user.selectedOffer.product_processing_fee}</p>
        <p className="mb-2"><span className="font-semibold">EMI:</span> {user.selectedOffer.emi}</p>
        <p className="mb-2"><span className="font-semibold">Chances of Approval:</span> {user.selectedOffer.chancesOfApproval}</p>
        <p className="mb-2"><span className="font-semibold">Prepayment Charges:</span> {user.selectedOffer.product_prepayment_charge}%</p>
        <p className="mb-2"><span className="font-semibold">Prepayment Conditions:</span> {user.selectedOffer.product_prepayment_conditions}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={consent}
            onChange={() => setConsent(!consent)}
            className="form-checkbox h-5 w-5 text-[#5F7A61]"
          />
          <label className="ml-2 text-gray-700">
            By Submitting, I provide my consent to retrieve my Credit Information
            from bureaus including CIBIL, to check eligibility for this application.
            I understand that this may impact my credit score.
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!consent}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${consent ? 'bg-[#5F7A61] hover:bg-[#4e6751]' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Submit Application
      </button>
    </div>
  );
};

export default ApplicationSubmission;


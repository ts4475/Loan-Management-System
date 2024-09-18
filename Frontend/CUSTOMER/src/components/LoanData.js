// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext} from '../context/UserContext';
// import axios from 'axios';
// import { useEffect } from 'react';

// const LoanData = ({ loanType }) => {
//     const { user, setUser } = useContext(UserContext);
//     const [pan, setPan] = useState('');
//     const [annualIncome, setAnnualIncome] = useState('');
//     const [loanAmount, setLoanAmount] = useState('');
//     const [tenure, setTenure] = useState('1');
//     const [maxLoanAmount, setMaxLoanAmount] = useState(0);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch user data
//         axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
//           .then(response => {
//             const userData = response.data;
//             if (userData.pan) {
//               setPan(userData.pan);
//             }
//             if (userData.annualIncome) {
//               setAnnualIncome(userData.annualIncome);
//               setMaxLoanAmount(Math.round(userData.annualIncome * 5));
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching user data', error);
//           });
//       }, [user.userId]);

//     const handleAnnualIncomeChange = (e) => {
//         const income = e.target.value;
//         setAnnualIncome(income);
//         setMaxLoanAmount(Math.round(income * 5));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setUser({
//             ...user,
//             pan,
//             annualIncome,
//             loanAmount,
//             tenure,
//             maxLoanAmount,
//             loanType // Save the loan type in the user context
//         });
//         updateUserDetails(user.userId, { pan, annualIncome });
//         navigate('/best-offers');
//     };

//     const updateUserDetails = (userId, details) => {
//         // Call the backend API to update the user details
//         axios.put(`http://localhost:8082/users/update/${userId}`, details)
//           .then(response => {
//             console.log('User details updated successfully');
//           })
//           .catch(error => {
//             console.error('Error updating user details', error);
//           });
//       };

//     return (
//         <div>
//             <h2>{loanType} Loan Data</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="pan"
//                     value={pan}
//                     onChange={(e) => setPan(e.target.value)}
//                     placeholder="PAN"
//                     required
//                     // readOnly={!!pan}  // Set the input field as read-only if pan is already set
//                 />
//                 <input
//                     type="number"
//                     name="annualIncome"
//                     value={annualIncome}
//                     onChange={handleAnnualIncomeChange}
//                     placeholder="Annual Income"
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="loanAmount"
//                     value={loanAmount}
//                     onChange={(e) => setLoanAmount(e.target.value)}
//                     placeholder="Loan Amount Required"
//                     required
//                 />
//                 {annualIncome && (
//                     <p style={{ color: 'red' }}>Maximum Amount Requested can be {maxLoanAmount}</p>
//                 )}
//                 <select
//                     name="tenure"
//                     value={tenure}
//                     onChange={(e) => setTenure(e.target.value)}
//                     required
//                 >
//                     <option value="1">1 Year</option>
//                     <option value="2">2 Years</option>
//                     <option value="3">3 Years</option>
//                     <option value="4">4 Years</option>
//                     <option value="5">5 Years</option>
//                 </select>
//                 <button type="submit">View Best Offers</button>
//             </form>
//         </div>
//     );
// };

// export default LoanData;

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Navbar from './Navbar';
 
const LoanData = ({ loanType }) => {
    const { user, setUser } = useContext(UserContext);
    const [pan, setPan] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [tenure, setTenure] = useState('1');
    const [maxLoanAmount, setMaxLoanAmount] = useState(0);
    const navigate = useNavigate();
 
    useEffect(() => {
        // Fetch user data
        axios.get(`http://localhost:8082/users/readOne/${user.userId}`)
            .then(response => {
                const userData = response.data;
                if (userData.pan) {
                    setPan(userData.pan);
                }
                if (userData.annualIncome) {
                    setAnnualIncome(userData.annualIncome);
                    setMaxLoanAmount(Math.round(userData.annualIncome * 5));
                }
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });
    }, [user.userId]);
 
    const handleAnnualIncomeChange = (e) => {
        const income = e.target.value;
        setAnnualIncome(income);
        setMaxLoanAmount(Math.round(income * 5));
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            pan,
            annualIncome,
            loanAmount,
            tenure,
            maxLoanAmount,
            loanType // Save the loan type in the user context
        });
        updateUserDetails(user.userId, { pan, annualIncome });
        navigate('/best-offers');
    };
 
    const updateUserDetails = (userId, details) => {
        // Call the backend API to update the user details
        axios.put(`http://localhost:8082/users/update/${userId}`, details)
            .then(response => {
                console.log('User details updated successfully');
            })
            .catch(error => {
                console.error('Error updating user details', error);
            });
    };
 
    return (
      <div><Navbar/>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#E7EEE1]">
            <div className="bg-[#5F7A61] p-10 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">{loanType} Loan Data</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col ">
                        <label className="text-white">PAN:</label>
                        <input
                            type="text"
                            name="pan"
                            value={pan}
                            onChange={(e) => setPan(e.target.value)}
                            placeholder="PAN"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Annual Income:</label>
                        <input
                            type="number"
                            name="annualIncome"
                            value={annualIncome}
                            onChange={handleAnnualIncomeChange}
                            placeholder="Annual Income"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Loan Amount Required:</label>
                        <input
                            type="number"
                            name="loanAmount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            placeholder="Loan Amount Required"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    {annualIncome && (
                        <p className="text-white">Maximum Amount Requested can be {maxLoanAmount}</p>
                    )}
                    <div className="flex flex-col">
                        <label className="text-white">Tenure:</label>
                        <select
                            name="tenure"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="4">4 Years</option>
                            <option value="5">5 Years</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-[#E7EEE1] text-black py-2 px-4 rounded-md">View Best Offers</button>
                </form>
            </div>
        </div>
        </div>
    );
};
 
export default LoanData;

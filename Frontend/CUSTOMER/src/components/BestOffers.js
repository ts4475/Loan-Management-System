// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';

// const BestOffers = () => {
//     const { user, setUser } = useContext(UserContext);
//     const [offers, setOffers] = useState([]);
//     const [requestedLoanAmount, setRequestedLoanAmount] = useState(user.loanAmount || 0);
//     const [tenure, setTenure] = useState(user.tenure || 1);
//     const [approvalChances, setApprovalChances] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:8084/loan-products/read')
//             .then(response => {
//                 const filteredOffers = response.data.filter(product => product.product_name.toLowerCase() === user.productName.toLowerCase());
//                 setOffers(filteredOffers);
//                 calculateApprovalChances(filteredOffers);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the loan products!', error);
//             });
//     }, [user.productName]);

//     const calculateEMI = (principal, rate, tenure) => {
//         const monthlyRate = rate / 12 / 100;
//         const numPayments = tenure * 12;
//         return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
//     };

//     const calculateApprovalChances = (offers) => {
//         const chances = offers.map(offer => {
//             const { product_interest_rate: interestRate, product_processing_fee: processingFee } = offer;
//             const requestedAmount = parseFloat(requestedLoanAmount);
//             const annualIncome = parseFloat(user.annualIncome);

//             let chance = 'Good';
//             if (requestedAmount < annualIncome * 0.5) {
//                 chance = 'Excellent';
//             } else if (requestedAmount < annualIncome) {
//                 chance = 'Very Good';
//             } else if (requestedAmount < annualIncome * 1.5) {
//                 chance = 'Good';
//             } else if (requestedAmount < annualIncome * 2) {
//                 chance = 'Bad';
//             } else {
//                 chance = 'Very Bad';
//             }

//             return chance;
//         });
//         setApprovalChances(chances);
//     };

//     const handleSliderChange = (value, type) => {
//         if (type === 'loanAmount') {
//             setRequestedLoanAmount(value);
//         } else {
//             setTenure(value);
//         }
//         calculateApprovalChances(offers);
//     };

//     const handleSelectOffer = (offer) => {
//         const emi = calculateEMI(requestedLoanAmount, offer.product_interest_rate, tenure).toFixed(2);
//         setUser({
//             ...user,
//             selectedOffer: { ...offer, emi },
//             requestedLoanAmount,
//             tenure,
//             maxLoanAmount: user.maxLoanAmount || (user.annualIncome * 5)
//         });
//         navigate('/application-submission');
//     };

//     return (
//         <div>
//             <h2>Best Offers for {user.productName} Loan</h2>
//             <div className="tiles">
//                 <div className="tile">
//                     <h3>Eligible Loan Amount</h3>
//                     <p>{user.maxLoanAmount}</p>
//                     <h3>Requested Loan Amount</h3>
//                     <p>{requestedLoanAmount}</p>
//                     <input
//                         type="range"
//                         min={user.annualIncome * 0.25}
//                         max={user.maxLoanAmount}
//                         value={requestedLoanAmount}
//                         onChange={(e) => handleSliderChange(e.target.value, 'loanAmount')}
//                     />
//                 </div>
//                 <div className="tile">
//                     <h3>Tenure</h3>
//                     <p>{tenure} years</p>
//                     <input
//                         type="range"
//                         min="1"
//                         max="5"
//                         value={tenure}
//                         onChange={(e) => handleSliderChange(e.target.value, 'tenure')}
//                     />
//                 </div>
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Vendor</th>
//                         <th>Interest Rate</th>
//                         <th>Processing Fee</th>
//                         <th>EMI</th>
//                         <th>Prepayment Charges & Conditions</th>
//                         <th>Chances of Approval</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {offers.length > 0 ? (
//                         offers.map((offer, index) => (
//                             <tr key={offer.product_id}>
//                                 <td>
//                                     <img src={offer.vendor.vendor_logo} alt={offer.vendor.vendor_name} width="50" height="50" />
//                                     {offer.vendor.vendor_name}
//                                 </td>
//                                 <td>{offer.product_interest_rate}%</td>
//                                 <td>{offer.product_processing_fee}</td>
//                                 <td>{calculateEMI(requestedLoanAmount, offer.product_interest_rate, tenure).toFixed(2)}</td>
//                                 <td>
//                                     {offer.product_prepayment_charge}% <br />
//                                     {offer.product_prepayment_conditions}
//                                 </td>
//                                 <td>{approvalChances[index]}</td>
//                                 <td>
//                                     <button onClick={() => handleSelectOffer(offer)}>Select Offer</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="7">No offers available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default BestOffers;


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
import axios from 'axios';
 
const BestOffers = () => {
    const { user, setUser } = useContext(UserContext);
    const [offers, setOffers] = useState([]);
    const [requestedLoanAmount, setRequestedLoanAmount] = useState(user.loanAmount || 0);
    const [tenure, setTenure] = useState(user.tenure || 1);
    const [approvalChances, setApprovalChances] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        axios.get('http://localhost:8084/loan-products/read')
            .then(response => {
                const filteredOffers = response.data.filter(product => product.product_name.toLowerCase() === user.productName.toLowerCase());
                setOffers(filteredOffers);
                calculateApprovalChances(filteredOffers);
            })
            .catch(error => {
                console.error('There was an error fetching the loan products!', error);
            });
    }, [user.productName]);
 
    const calculateEMI = (principal, rate, tenure) => {
        const monthlyRate = rate / 12 / 100;
        const numPayments = tenure * 12;
        return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    };
 
    const calculateApprovalChances = (offers) => {
        const chances = offers.map(offer => {
            const { product_interest_rate: interestRate, product_processing_fee: processingFee } = offer;
            const requestedAmount = parseFloat(requestedLoanAmount);
            const annualIncome = parseFloat(user.annualIncome);
 
            let chance = 'Good';
            if (requestedAmount < annualIncome * 0.5) {
                chance = 'Excellent';
            } else if (requestedAmount < annualIncome) {
                chance = 'Very Good';
            } else if (requestedAmount < annualIncome * 1.5) {
                chance = 'Good';
            } else if (requestedAmount < annualIncome * 2) {
                chance = 'Bad';
            } else {
                chance = 'Very Bad';
            }
 
            return chance;
        });
        setApprovalChances(chances);
    };
 
    const handleSliderChange = (value, type) => {
        if (type === 'loanAmount') {
            setRequestedLoanAmount(value);
        } else {
            setTenure(value);
        }
        calculateApprovalChances(offers);
    };
 
    const handleSelectOffer = (offer) => {
        const emi = calculateEMI(requestedLoanAmount, offer.product_interest_rate, tenure).toFixed(2);
        setUser({
            ...user,
            selectedOffer: { ...offer, emi },
            requestedLoanAmount,
            tenure,
            maxLoanAmount: user.maxLoanAmount || (user.annualIncome * 5)
        });
        navigate('/application-submission');
    };
 
    return (
        <div className="min-h-screen flex flex-col items-center bg-[#E7EEE1] ">
            <Navbar/>
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 bg-[#B9D79F]">
                <h2 className="text-2xl font-bold mb-6 text-center">Best Offers for {user.productName} Loan</h2>
                <div className="flex justify-between items-end mb-6 bg-[#B9D79F] p-4 rounded-lg">
                    <div className="w-1/2 p-4">
                        <h3 className="text-xl font-semibold">Eligible Loan Amount</h3>
                        <p className="text-lg">{user.maxLoanAmount.toLocaleString()}</p>
                        <h3 className="text-xl font-semibold">Requested Loan Amount</h3>
                        <p className="text-lg">{requestedLoanAmount.toLocaleString()}</p>
                        <input
                            type="range"
                            min={user.annualIncome * 0.25}
                            max={user.maxLoanAmount}
                            value={requestedLoanAmount}
                            onChange={(e) => handleSliderChange(e.target.value, 'loanAmount')}
                            className="w-full mt-2"
                        />
                        <p className="text-sm text-gray-700 mt-1">Minimum: {Math.round(user.annualIncome * 0.25).toLocaleString()}</p>
                    </div>
                    <div className="w-1/2 p-4">
                        <h3 className="text-xl font-semibold mb-4">Tenure</h3>
                        <p className="text-lg">{tenure} years</p>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={tenure}
                            onChange={(e) => handleSliderChange(e.target.value, 'tenure')}
                            className="w-full mt-2"
                        />
                        <p className="text-sm text-gray-700 mt-1">Minimum: 1 year</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="w-full bg-[#E7EEE1] text-left text-xs uppercase">
                                <th className="py-3 px-4">Vendor</th>
                                <th className="py-3 px-4">Interest Rate</th>
                                <th className="py-3 px-4">Processing Fee</th>
                                <th className="py-3 px-4">EMI</th>
                                <th className="py-3 px-4">Prepayment Charges</th>
                                <th className="py-3 px-4">Conditions</th>
                                <th className="py-3 px-4">Chances of Approval</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length > 0 ? (
                                offers.map((offer, index) => (
                                    <tr key={offer.product_id} className="border-b">
                                        <td className="py-4 px-4 flex items-center">
                                            <img src={offer.vendor.vendor_logo} alt={offer.vendor.vendor_name} className="w-12 h-12 mr-4" />
                                            {offer.vendor.vendor_name}
                                        </td>
                                        <td className="py-4 px-4">{offer.product_interest_rate}%</td>
                                        <td className="py-4 px-4">{offer.product_processing_fee}%</td>
                                        <td className="py-4 px-4">₹{calculateEMI(requestedLoanAmount, offer.product_interest_rate, tenure).toFixed(2)}</td>
                                        <td className="py-4 px-4">{offer.product_prepayment_charge}%</td>
                                        <td className="py-4 px-4">{offer.product_prepayment_conditions}</td>
                                        <td className="py-4 px-4">{approvalChances[index]}</td>
                                        <td className="py-4 px-4">
                                            <button
                                                onClick={() => handleSelectOffer(offer)}
                                                className="bg-green-700 text-white py-2 px-4 rounded"
                                            >
                                                Select Offer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center">No offers available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
 
export default BestOffers;

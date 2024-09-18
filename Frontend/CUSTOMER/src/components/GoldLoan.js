// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// const GoldLoan = () => {
//     const { user, setUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleApply = () => {
//         setUser({ ...user, productName: 'Gold' });
//         navigate('/loan-data');
//     };

//     return (
//         <div>
//             <h2>Gold Loan Details</h2>
//             <p>Some details about gold loan...</p>
//             <button onClick={handleApply}>Apply Now</button>
//         </div>
//     );
// };

// export default GoldLoan;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
 
const GoldLoan = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
 
    const handleApply = () => {
        setUser({ ...user, productName: 'Gold' });
        navigate('/loan-data');
    };
 
    return (
        <div className="h-screen overflow-hidden ">
            <Navbar />
            <div className="flex items-center justify-center h-full bg-[#E7EEE1]">
                <div className="text-white p-8 rounded-lg shadow-lg bg-[#5F7A61]">
                    <h2 className="text-xl font-bold mb-4">Gold Loan Details</h2>
                    <p className="mb-4">Some details about gold loan...</p>
                    <button
                        onClick={handleApply}
                        className="bg-white text-green-600 py-2 px-4 rounded hover:bg-gray-200"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};
 
export default GoldLoan;
 

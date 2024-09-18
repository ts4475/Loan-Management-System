// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// const HomeLoan = () => {
//     const { user, setUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleApply = () => {
//         setUser({ ...user, productName: 'Home' });
//         navigate('/loan-data');
//     };

//     return (
//         <div>
//             <h2>Home Loan Details</h2>
//             <p>Some details about home loan...</p>
//             <button onClick={handleApply}>Apply Now</button>
//         </div>
//     );
// };

// export default HomeLoan;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
 
const HomeLoan = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
 
    const handleApply = () => {
        setUser({ ...user, productName: 'Home' });
        navigate('/loan-data');
    };
 
    return (
        <div className="h-screen overflow-hidden">
            <Navbar />
            <div className="flex items-center justify-center h-full bg-[#E7EEE1]">
                <div className="text-white p-8 rounded-lg shadow-lg bg-[#5F7A61]">
                    <h2 className="text-xl font-bold mb-4">Home Loan Details</h2>
                    <p className="mb-4">Some details about home loan...</p>
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
 
export default HomeLoan;
 
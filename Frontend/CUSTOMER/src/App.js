
// // import React, { useContext } from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import SignUp from './components/SignUp';
// // import PersonalDetails from './components/PersonalDetails';
// // import CustomerDashboard from './components/CustomerDashboard';
// // import PersonalLoan from './components/PersonalLoan';
// // import LoanData from './components/LoanData';
// // import BestOffers from './components/BestOffers';
// // import ApplicationSubmission from './components/ApplicationSubmission';
// // import Login from './components/Login';
// // import HomeLoan from './components/HomeLoan'; // Import HomeLoan component
// // import GoldLoan from './components/GoldLoan'; // Import GoldLoan component
// // import Tracking1 from './components/Tracking1';
// // import Tracking2 from './components/Tracking2';
// // import Tracking3 from './components/Tracking3';
// // import Tracking4 from './components/Tracking4';
// // import Tracking5 from './components/Tracking5';
// // import Tracking6 from './components/Tracking6';


// // import { UserContext } from './context/UserContext';


// // function App() {
// //     const { user } = useContext(UserContext);

// //     return (
// //         <div className="App">
// //             <Routes>
// //                 <Route path="/" element={<SignUp />} />
// //                 <Route path="/personal-details" element={<PersonalDetails />} />
// //                 <Route path="/login" element={<Login />} />
// //                 <Route
// //                     path="/dashboard"
// //                     element={user.userId ? <CustomerDashboard /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/apply/home"
// //                     element={user.userId ? <HomeLoan /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/apply/gold"
// //                     element={user.userId ? <GoldLoan /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/apply/personal"
// //                     element={user.userId ? <PersonalLoan /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/loan-data"
// //                     element={user.userId ? <LoanData /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/best-offers"
// //                     element={user.userId ? <BestOffers /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/application-submission"
// //                     element={user.userId ? <ApplicationSubmission /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/tracking1/:application_id"
// //                     element={user.userId ? <Tracking1 /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/tracking2/:application_id"
// //                     element={user.userId ? <Tracking2 /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/tracking3/:application_id"
// //                     element={user.userId ? <Tracking3 /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/tracking4/:application_id"
// //                     element={user.userId ? <Tracking4 /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/tracking5/:application_id"
// //                     element={user.userId ? <Tracking5 /> : <Navigate to="/login" />}
// //                 />
// //                 <Route
// //                     path="/tracking6/:application_id"
// //                     element={user.userId ? <Tracking6 /> : <Navigate to="/login" />}
// //                 />
// //             </Routes>
// //         </div>
// //     );
// // }

// // export default App;

// // src/App.js
// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import PersonalDetails from './components/PersonalDetails';
// import CustomerDashboard from './components/CustomerDashboard';
// import PersonalLoan from './components/PersonalLoan';
// import LoanData from './components/LoanData';
// import BestOffers from './components/BestOffers';
// import ApplicationSubmission from './components/ApplicationSubmission';
// import Login from './components/Login';
// import HomeLoan from './components/HomeLoan';
// import GoldLoan from './components/GoldLoan';
// import Tracking1 from './components/Tracking1';
// import Tracking2 from './components/Tracking2';
// import Tracking3 from './components/Tracking3';
// import Tracking4 from './components/Tracking4';
// import Tracking5 from './components/Tracking5';
// import Tracking6 from './components/Tracking6';
// import Logout from './components/Logout'; // Import Logout component
// import Support from './components/Support';

// import { UserContext } from './context/UserContext';
// import TransactionsPage from './components/TransactionsPage';
// import RepaymentsPage from './components/RepaymentsPage';

// const App = () => {
//     const { user } = useContext(UserContext);

//     return (
//         <div className="App">
//             <Routes>
//                 <Route path="/" element={<SignUp />} />
//                 <Route path="/personal-details" element={<PersonalDetails />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/support" element={user.userId ? <Support /> : <Navigate to="/login" />} />
//                 <Route path="/logout" element={<Logout />} /> {/* Add Logout Route */}
//                 <Route
//                     path="/dashboard"
//                     element={user.userId ? <CustomerDashboard /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/apply/home"
//                     element={user.userId ? <HomeLoan /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/apply/gold"
//                     element={user.userId ? <GoldLoan /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/apply/personal"
//                     element={user.userId ? <PersonalLoan /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/loan-data"
//                     element={user.userId ? <LoanData /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/best-offers"
//                     element={user.userId ? <BestOffers /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/application-submission"
//                     element={user.userId ? <ApplicationSubmission /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/tracking1/:application_id"
//                     element={user.userId ? <Tracking1 /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/tracking2/:application_id"
//                     element={user.userId ? <Tracking2 /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/tracking3/:application_id"
//                     element={user.userId ? <Tracking3 /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/tracking4/:application_id"
//                     element={user.userId ? <Tracking4 /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/tracking5/:application_id"
//                     element={user.userId ? <Tracking5 /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/tracking6/:application_id"
//                     element={user.userId ? <Tracking6 /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/transactions/:loanId"
//                     element={user.userId ? <TransactionsPage /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                     path="/repayments/:loanId"
//                     element={user.userId ? <RepaymentsPage /> : <Navigate to="/login" />}
//                 />
                
//                 <Route path="/myprofile" element={user.userId ? <div>My Profile Page</div> : <Navigate to="/login" />} />
//             </Routes>
//         </div>
//     );
// };

// export default App;





import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import PersonalDetails from './components/PersonalDetails';
import CustomerDashboard from './components/CustomerDashboard';
import PersonalLoan from './components/PersonalLoan';
import LoanData from './components/LoanData';
import BestOffers from './components/BestOffers';
import ApplicationSubmission from './components/ApplicationSubmission';
import Login from './components/Login';
import LoginOTP from './components/LoginOTP'; // New Component
import ForgotPassword from './components/ForgotPassword'; // New Component
import ForgotPasswordSQ from './components/ForgotPasswordSQ'; // New Component
import HomeLoan from './components/HomeLoan';
import GoldLoan from './components/GoldLoan';
import Tracking1 from './components/Tracking1';
import Tracking2 from './components/Tracking2';
import Tracking3 from './components/Tracking3';
import Tracking4 from './components/Tracking4';
import Tracking5 from './components/Tracking5';
import Tracking6 from './components/Tracking6';
import Logout from './components/Logout'; // Import Logout component
import Support from './components/Support';

import { UserContext } from './context/UserContext';
import TransactionsPage from './components/TransactionsPage';
import RepaymentsPage from './components/RepaymentsPage';

import NotificationsPage from './components/NotificationsPage';

const App = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/personal-details" element={<PersonalDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-otp" element={<LoginOTP />} /> {/* New Route */}
                <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New Route */}
                <Route path="/forgot-password-sq" element={<ForgotPasswordSQ />} /> {/* New Route */}
                <Route path="/support" element={user.userId ? <Support /> : <Navigate to="/login" />} />
                <Route path="/logout" element={<Logout />} /> {/* Add Logout Route */}
                <Route
                    path="/dashboard"
                    element={user.userId ? <CustomerDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/apply/home"
                    element={user.userId ? <HomeLoan /> : <Navigate to="/login" />}
                />
                <Route
                    path="/apply/gold"
                    element={user.userId ? <GoldLoan /> : <Navigate to="/login" />}
                />
                <Route
                    path="/apply/personal"
                    element={user.userId ? <PersonalLoan /> : <Navigate to="/login" />}
                />
                <Route
                    path="/loan-data"
                    element={user.userId ? <LoanData /> : <Navigate to="/login" />}
                />
                <Route
                    path="/best-offers"
                    element={user.userId ? <BestOffers /> : <Navigate to="/login" />}
                />
                <Route
                    path="/application-submission"
                    element={user.userId ? <ApplicationSubmission /> : <Navigate to="/login" />}
                />
                <Route
                    path="/tracking1/:application_id"
                    element={user.userId ? <Tracking1 /> : <Navigate to="/login" />}
                />
                <Route
                    path="/tracking2/:application_id"
                    element={user.userId ? <Tracking2 /> : <Navigate to="/login" />}
                />
                <Route
                    path="/tracking3/:application_id"
                    element={user.userId ? <Tracking3 /> : <Navigate to="/login" />}
                />
                <Route
                    path="/tracking4/:application_id"
                    element={user.userId ? <Tracking4 /> : <Navigate to="/login" />}
                />
                <Route
                    path="/tracking5/:application_id"
                    element={user.userId ? <Tracking5 /> : <Navigate to="/login" />}
                />
                <Route
                    path="/tracking6/:application_id"
                    element={user.userId ? <Tracking6 /> : <Navigate to="/login" />}
                />
                <Route
                    path="/transactions/:loanId"
                    element={user.userId ? <TransactionsPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/repayments/:loanId"
                    element={user.userId ? <RepaymentsPage /> : <Navigate to="/login" />}
                />
                
                <Route path="/myprofile" element={user.userId ? <div>My Profile Page</div> : <Navigate to="/login" />} />

                <Route path="/notifications" element={user.userId ? <NotificationsPage /> : <Navigate to="/login" />} /> {/* Add Notifications Route */}
            </Routes>
        </div>
    );
};

export default App;

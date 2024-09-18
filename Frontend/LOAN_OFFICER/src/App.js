// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Support from './components/Support';
// // import AddVendor from './components/AddVendor';
// // import UpdateVendor from './components/UpdateVendor';
// // import ShowVendors from './components/ShowVendors';
// // import Customer from './components/Customer';
// // import MyAccount from './components/MyAccount';
// // import AddLoanProducts from './components/AddLoanProduct';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/support" element={<Support />} />
//         {/* <Route path="/add-vendor" element={<AddVendor />} />
//         <Route path="/add-loan-products/:vendorId" element={<AddLoanProducts />} />
//         <Route path="/update-vendor" element={<UpdateVendor />} />
//         <Route path="/show-vendors" element={<ShowVendors />} />

//         <Route path="/myaccount" element={<MyAccount/>}/>
//         <Route path="/customers" element={<Customer />} /> Ensure this route is correct */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './components/Signup';
// import PersonalDetails from './components/PersonalDetails';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/personal-details" element={<PersonalDetails />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import PersonalDetails from './components/PersonalDetails';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Support from './components/Support';
import MyAccount from './components/MyAccount';
import Login from './components/Login';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/support" element={<Support />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
    </Router>
  );
};

export default App;



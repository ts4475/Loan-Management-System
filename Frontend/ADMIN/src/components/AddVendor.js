import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AddVendor = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorLogo, setVendorLogo] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(contactEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(contactPhone)) {
      alert('Please enter a valid phone number (10 digits).');
      return;
    }

    try {
      // Send a POST request to the server with the form data
      const response = await axios.post('http://localhost:8084/vendors/add', {
        vendor_name: vendorName,
        vendor_logo: vendorLogo,
        contact_email: contactEmail,
        contact_phone: contactPhone,
      });

      // Extract the vendor ID from the server response
      const vendorId = response.data.vendor_id;

      // Navigate to the AddLoanProducts page with the vendorId
      setTimeout(() => {
        navigate(`/add-loan-products/${vendorId}`);
      }, 1000);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding vendor', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col items-center p-5 bg-[#E7EEE1] h-screen">
        <h2 className="text-2xl font-bold mb-5">Add Vendor Details</h2>
        <form onSubmit={handleSubmit} className="bg-[#B9D79F] p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700">Institution Name:</label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Upload Institution Logo:</label>
              <input
                type="text"
                value={vendorLogo}
                onChange={(e) => setVendorLogo(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Contact Email:</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Contact Phone:</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button type="submit" className="bg-[#5F7A61] text-white py-2 px-4 rounded">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AdminNavbar from './AdminNavbar';

// const AddVendor = () => {
//   const [vendorName, setVendorName] = useState('');
//   const [vendorLogo, setVendorLogo] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to the server with the form data
//       const response = await axios.post('http://localhost:8084/vendors/add', {
//         vendor_name: vendorName,
//         vendor_logo: vendorLogo,
//         contact_email: contactEmail,
//         contact_phone: contactPhone,
//       });

//        // Extract the vendor ID from the server response
//       const vendorId = response.data.vendor_id;

//       // Navigate to the AddLoanProducts page with the vendorId
//       setTimeout(() => {
//         navigate(`/add-loan-products/${vendorId}`);
//       }, 1000);
//     } catch (error) {
//        // Handle any errors that occur during the request
//       console.error('Error adding vendor', error);
//     }
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex flex-col items-center p-5 bg-[#E7EEE1] h-screen">
//         <h2 className="text-2xl font-bold mb-5">Add Vendor Details</h2>
//         <form onSubmit={handleSubmit} className="bg-[#B9D79F] p-10 rounded-lg shadow-lg w-full max-w-2xl">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-gray-700">Institution Name:</label>
//               <input
//                 type="text"
//                 value={vendorName}
//                 onChange={(e) => setVendorName(e.target.value)}
//                 required
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Upload Institution Logo:</label>
//               <input
//                 type="text"
//                 value={vendorLogo}
//                 onChange={(e) => setVendorLogo(e.target.value)}
//                 required
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Contact Email:</label>
//               <input
//                 type="email"
//                 value={contactEmail}
//                 onChange={(e) => setContactEmail(e.target.value)}
//                 required
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Contact Phone:</label>
//               <input
//                 type="tel"
//                 value={contactPhone}
//                 onChange={(e) => setContactPhone(e.target.value)}
//                 required
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//           </div>
//           <div className="flex justify-center mt-5">
//             <button type="submit" className="bg-[#5F7A61] text-white py-2 px-4 rounded">
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddVendor;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const ShowVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loanProducts, setLoanProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredVendors, setFilteredVendors] = useState([]);

  const fetchVendors = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8084/vendors/read');
      setVendors(response.data);
      setFilteredVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendor data', error);
    }
  }, []);

  const fetchLoanProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8084/loan-products/read');
      setLoanProducts(response.data);
    } catch (error) {
      console.error('Error fetching loan products data', error);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
    fetchLoanProducts();
  }, [fetchVendors, fetchLoanProducts]);

  const getProductNames = (vendorId) => {
    return loanProducts
      .filter((product) => product.vendor && product.vendor.vendor_id === vendorId)
      .map((product) => product.product_name)
      .join(', ');
  };

  useEffect(() => {
    const handleSearchAndSort = () => {
      let searchResults = vendors;

      if (searchTerm) {
        searchResults = vendors.filter(vendor =>
          vendor.vendor_id.toString().includes(searchTerm) ||
          (vendor.vendor_name && vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (vendor.contact_phone && vendor.contact_phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (vendor.contact_email && vendor.contact_email.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (sortField) {
        searchResults = [...searchResults].sort((a, b) => {
          const fieldA = a[sortField];
          const fieldB = b[sortField];
          if (sortOrder === 'asc') {
            return fieldA > fieldB ? 1 : -1;
          } else {
            return fieldA < fieldB ? 1 : -1;
          }
        });
      }

      setFilteredVendors(searchResults);
    };

    handleSearchAndSort();
  }, [searchTerm, sortField, sortOrder, vendors]);

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col items-center p-5 bg-[#E7EEE1] min-h-screen">
        <h2 className="text-2xl font-bold mb-5">Vendor Details</h2>
        <div className="flex flex-wrap justify-between items-center w-full max-w-6xl mb-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Search Vendor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/4"
          />
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2 w-full md:w-3/4 justify-end">
            <div className="flex flex-wrap items-center space-x-2">
              <label className="whitespace-nowrap">Sort by:</label>
              <select onChange={(e) => setSortField(e.target.value)} className="p-2 border border-gray-300 rounded">
                <option value="">Select Field</option>
                <option value="vendor_name">Vendor Name</option>
                <option value="vendor_id">Vendor ID</option>
              </select>
              <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 border border-gray-300 rounded">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-[#5F7A61] rounded-lg shadow-lg p-5 w-full max-w-6xl">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Vendor ID</th>
                <th className="py-2 px-4">Vendor Name</th>
                <th className="py-2 px-4">Vendor Logo</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Products</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.vendor_id} className="border-t">
                  <td className="py-4 px-6">{vendor.vendor_id}</td>
                  <td className="py-4 px-6">{vendor.vendor_name}</td>
                  <td className="py-4 px-6">
                    <img src={vendor.vendor_logo} alt={vendor.vendor_name} className="w-12 h-auto mx-auto" />
                  </td>
                  <td className="py-4 px-6">{vendor.contact_phone}</td>
                  <td className="py-4 px-6">{vendor.contact_email}</td>
                  <td className="py-4 px-6">{getProductNames(vendor.vendor_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowVendors;

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import AdminNavbar from './AdminNavbar';

// const ShowVendors = () => {
//   const [vendors, setVendors] = useState([]);
//   const [loanProducts, setLoanProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [filteredVendors, setFilteredVendors] = useState([]);

//   const fetchVendors = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:8084/vendors/read');
//       setVendors(response.data);
//       setFilteredVendors(response.data);
//     } catch (error) {
//       console.error('Error fetching vendor data', error);
//     }
//   }, []);

//   const fetchLoanProducts = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:8084/loan-products/read');
//       setLoanProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching loan products data', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchVendors();
//     fetchLoanProducts();
//   }, [fetchVendors, fetchLoanProducts]);

//   const getProductNames = (vendorId) => {
//     return loanProducts
//       .filter((product) => product.vendor && product.vendor.vendor_id === vendorId)
//       .map((product) => product.product_name)
//       .join(', ');
//   };

//   useEffect(() => {
//     const handleSearch = () => {
//       const searchResults = vendors.filter(vendor =>
//         vendor.vendor_id.toString().includes(searchTerm) ||
//         vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vendor.contact_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vendor.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredVendors(searchResults);
//     };
//     handleSearch();
//   }, [searchTerm, vendors]);

//   useEffect(() => {
//     const handleSort = () => {
//       const sortedVendors = [...filteredVendors].sort((a, b) => {
//         if (sortField) {
//           const fieldA = a[sortField];
//           const fieldB = b[sortField];
//           if (sortOrder === 'asc') {
//             return fieldA > fieldB ? 1 : -1;
//           } else {
//             return fieldA < fieldB ? 1 : -1;
//           }
//         }
//         return 0;
//       });
//       setFilteredVendors(sortedVendors);
//     };
//     handleSort();
//   }, [sortField, sortOrder]);

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex flex-col items-center p-5 bg-[#E7EEE1] min-h-screen">
//         <h2 className="text-2xl font-bold mb-5">View All Details</h2>
//         <div className="flex flex-wrap justify-between items-center w-full max-w-6xl mb-4 space-y-2 md:space-y-0">
//           <input
//             type="text"
//             placeholder="Search Vendor"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 border border-gray-300 rounded w-full md:w-1/4"
//           />
//           <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2 w-full md:w-3/4 justify-end">
//             <div className="flex flex-wrap items-center space-x-2">
//               <label className="whitespace-nowrap">Sort by:</label>
//               <select onChange={(e) => setSortField(e.target.value)} className="p-2 border border-gray-300 rounded">
//                 <option value="">Select Field</option>
//                 <option value="vendor_name">Vendor Name</option>
//                 <option value="vendor_id">Vendor ID</option>
//               </select>
//               <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 border border-gray-300 rounded">
//                 <option value="asc">Ascending</option>
//                 <option value="desc">Descending</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="bg-[#5F7A61] rounded-lg shadow-lg p-5 w-full max-w-6xl">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4">Vendor ID</th>
//                 <th className="py-2 px-4">Vendor Name</th>
//                 <th className="py-2 px-4">Vendor Logo</th>
//                 <th className="py-2 px-4">Contact</th>
//                 <th className="py-2 px-4">Email</th>
//                 <th className="py-2 px-4">Products</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredVendors.map((vendor) => (
//                 <tr key={vendor.vendor_id} className="border-t">
//                   <td className="py-4 px-6">{vendor.vendor_id}</td>
//                   <td className="py-4 px-6">{vendor.vendor_name}</td>
//                   <td className="py-4 px-6">
//                     <img src={vendor.vendor_logo} alt={vendor.vendor_name} className="w-12 h-auto mx-auto" />
//                   </td>
//                   <td className="py-4 px-6">{vendor.contact_phone}</td>
//                   <td className="py-4 px-6">{vendor.contact_email}</td>
//                   <td className="py-4 px-6">{getProductNames(vendor.vendor_id)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowVendors;

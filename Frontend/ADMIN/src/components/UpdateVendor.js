import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const UpdateVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorDetails, setVendorDetails] = useState({
    vendor_name: '',
    vendor_logo: '',
  });
  const [loanProducts, setLoanProducts] = useState([]);
  const [allProducts] = useState(['Personal', 'Gold', 'Home']);
  const [unavailableProducts, setUnavailableProducts] = useState([]);
  const [isEditable, setIsEditable] = useState({
    vendor_name: false,
    vendor_logo: false,
  });
  const [loanProductEdits, setLoanProductEdits] = useState({});
  const [newLoanProduct, setNewLoanProduct] = useState({
    product_name: '',
    product_interest_rate: '',
    product_processing_fee: '',
    product_prepayment_charge: '',
    product_prepayment_conditions: '',
  });
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await axios.get('http://localhost:8084/vendors/read');
      setVendors(response.data);
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      const fetchVendorDetails = async () => {
        const response = await axios.get(`http://localhost:8084/vendors/readOne/${selectedVendor}`);
        setVendorDetails({
          vendor_name: response.data.vendor_name,
          vendor_logo: response.data.vendor_logo,
        });
      };

      const fetchLoanProducts = async () => {
        const response = await axios.get(`http://localhost:8084/loan-products/vendor/${selectedVendor}`);
        setLoanProducts(response.data);
        updateUnavailableProducts(response.data);
      };

      fetchVendorDetails();
      fetchLoanProducts();
    }
  }, [selectedVendor]);

  const updateUnavailableProducts = (products) => {
    const availableProductNames = products.map((product) => product.product_name);
    const unavailable = allProducts.filter((product) => !availableProductNames.includes(product));
    setUnavailableProducts(unavailable);
  };

  const handleEditChange = (e) => {
    setVendorDetails({
      ...vendorDetails,
      [e.target.name]: e.target.value,
    });
    setShowSaveButton(true);
  };

  const handleLoanProductChange = (e, productId) => {
    const { name, value } = e.target;
    setLoanProductEdits((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [name]: value,
        product_name: loanProducts.find((product) => product.product_id === productId).product_name,
        vendor: { vendor_id: selectedVendor },
      },
    }));
    setShowSaveButton(true);
  };

  const handleEditEnable = (productId, field) => {
    setLoanProductEdits((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [field]: loanProducts.find((product) => product.product_id === productId)[field] || '',
        product_name: loanProducts.find((product) => product.product_id === productId).product_name,
        vendor: { vendor_id: selectedVendor },
      },
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8084/vendors/update/${selectedVendor}`, vendorDetails);
      for (let productId in loanProductEdits) {
        await axios.put(`http://localhost:8084/loan-products/update/${productId}`, loanProductEdits[productId]);
      }
      alert('Vendor details updated successfully');
      setLoanProductEdits({});
      setIsEditable({
        vendor_name: false,
        vendor_logo: false,
      });
      setShowSaveButton(false);
      // Fetch updated loan products to reset the form
      const updatedLoanProducts = await axios.get(`http://localhost:8084/loan-products/vendor/${selectedVendor}`);
      setLoanProducts(updatedLoanProducts.data);
    } catch (error) {
      console.error('Error updating vendor details', error);
    }
  };

  const handleAddLoanProductChange = (e) => {
    const { name, value } = e.target;
    setNewLoanProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddLoanProduct = async () => {
    const newProduct = {
      ...newLoanProduct,
      vendor: { vendor_id: selectedVendor },
    };
    try {
      await axios.post('http://localhost:8084/loan-products/add', newProduct);
      alert(`${newLoanProduct.product_name} Loan Product added successfully`);
      const updatedLoanProducts = await axios.get(`http://localhost:8084/loan-products/vendor/${selectedVendor}`);
      setLoanProducts(updatedLoanProducts.data);
      updateUnavailableProducts(updatedLoanProducts.data);
      setNewLoanProduct({
        product_name: '',
        product_interest_rate: '',
        product_processing_fee: '',
        product_prepayment_charge: '',
        product_prepayment_conditions: '',
      });
    } catch (error) {
      console.error('Error adding loan product', error);
    }
  };

  const handleDeleteLoanProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8084/loan-products/delete/${productId}`);
      alert('Loan product deleted successfully');
      const updatedLoanProducts = await axios.get(`http://localhost:8084/loan-products/vendor/${selectedVendor}`);
      setLoanProducts(updatedLoanProducts.data);
      updateUnavailableProducts(updatedLoanProducts.data);
    } catch (error) {
      console.error('Error deleting loan product', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-5 bg-[#E7EEE1]  min-h-screen">
        <h2 className="text-2xl font-bold mb-5">Update Vendor Details</h2>
        <div className="mb-5">
          <label className="block mb-2">Select Vendor:</label>
          <select
            className="p-2 border border-gray-300 rounded"
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.vendor_id} value={vendor.vendor_id}>
                {vendor.vendor_name}
              </option>
            ))}
          </select>
        </div>
        {selectedVendor && (
          <div className="bg-[#B9D79F] p-5 rounded-lg shadow-lg mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative flex items-center">
                <label className="block text-gray-700">Institution Name:</label>
                <input
                  type="text"
                  name="vendor_name"
                  value={vendorDetails.vendor_name}
                  onChange={handleEditChange}
                  readOnly={!isEditable.vendor_name}
                  className={`mt-1 p-2 border ${isEditable.vendor_name ? 'border-blue-500' : 'border-gray-300'} rounded w-3/4`}
                />
                <button
                  onClick={() => setIsEditable((prev) => ({ ...prev, vendor_name: true }))}
                  className="ml-2 bg-[#5F7A61] text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
              </div>
              <div className="relative flex items-center">
                <label className="block text-gray-700">Bank Logo:</label>
                <input
                  type="text"
                  name="vendor_logo"
                  value={vendorDetails.vendor_logo}
                  onChange={handleEditChange}
                  readOnly={!isEditable.vendor_logo}
                  className={`mt-1 p-2 border ${isEditable.vendor_logo ? 'border-blue-500' : 'border-gray-300'} rounded w-3/4`}
                />
                <button
                  onClick={() => setIsEditable((prev) => ({ ...prev, vendor_logo: true }))}
                  className="ml-2 bg-[#5F7A61] text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedVendor && (
          <div className="bg-[#B9D79F] p-5 rounded-lg shadow-lg">
            <p className="text-xl font-bold mb-3">Loan Products</p>
            {loanProducts.map((product) => (
              <div key={product.product_id} className="mb-5">
                <p className="text-lg font-semibold mb-2">{product.product_name} Loan</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative flex items-center">
                    <label className="block text-gray-700">Interest Rate:</label>
                    <input
                      type="text"
                      name="product_interest_rate"
                      value={loanProductEdits[product.product_id]?.product_interest_rate ?? product.product_interest_rate}
                      onChange={(e) => handleLoanProductChange(e, product.product_id)}
                      readOnly={!loanProductEdits[product.product_id]}
                      className="mt-1 p-2 border border-gray-300 rounded w-3/4"
                    />
                    <button
                      onClick={() => handleEditEnable(product.product_id, 'product_interest_rate')}
                      className="ml-2 bg-[#5F7A61] text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <label className="block text-gray-700">Processing Fees:</label>
                    <input
                      type="text"
                      name="product_processing_fee"
                      value={loanProductEdits[product.product_id]?.product_processing_fee ?? product.product_processing_fee}
                      onChange={(e) => handleLoanProductChange(e, product.product_id)}
                      readOnly={!loanProductEdits[product.product_id]}
                      className="mt-1 p-2 border border-gray-300 rounded w-3/4"
                    />
                    <button
                      onClick={() => handleEditEnable(product.product_id, 'product_processing_fee')}
                      className="ml-2 bg-[#5F7A61] text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <label className="block text-gray-700">Prepayment Charges:</label>
                    <input
                      type="text"
                      name="product_prepayment_charge"
                      value={loanProductEdits[product.product_id]?.product_prepayment_charge ?? product.product_prepayment_charge}
                      onChange={(e) => handleLoanProductChange(e, product.product_id)}
                      readOnly={!loanProductEdits[product.product_id]}
                      className="mt-1 p-2 border border-gray-300 rounded w-3/4"
                    />
                    <button
                      onClick={() => handleEditEnable(product.product_id, 'product_prepayment_charge')}
                      className="ml-2 bg-[#5F7A61] text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <label className="block text-gray-700">Prepayment Conditions:</label>
                    <input
                      type="text"
                      name="product_prepayment_conditions"
                      value={loanProductEdits[product.product_id]?.product_prepayment_conditions ?? product.product_prepayment_conditions}
                      onChange={(e) => handleLoanProductChange(e, product.product_id)}
                      readOnly={!loanProductEdits[product.product_id]}
                      className="mt-1 p-2 border border-gray-300 rounded w-3/4"
                    />
                    <button
                      onClick={() => handleEditEnable(product.product_id, 'product_prepayment_conditions')}
                      className="ml-2 bg-[#5F7A61] text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <button onClick={() => handleDeleteLoanProduct(product.product_id)} className="mt-3 bg-red-700 text-white py-2 px-4 rounded">Delete</button>
              </div>
            ))}
            <div className="mt-5">
              <p className="text-lg font-semibold mb-3">Add New Loan Product</p>
              <div className="relative">
                <label className="block text-gray-700">Select Product:</label>
                <select
                  className="p-2 border border-gray-300 rounded w-full"
                  onChange={(e) => setNewLoanProduct({ ...newLoanProduct, product_name: e.target.value })}
                  value={newLoanProduct.product_name}
                >
                  <option value="">Select Product</option>
                  {unavailableProducts.map((product) => (
                    <option key={product} value={product}>{product} Loan</option>
                  ))}
                </select>
              </div>
              {newLoanProduct.product_name && (
                <div className="mt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-gray-700">Interest Rate:</label>
                      <input
                        type="text"
                        name="product_interest_rate"
                        value={newLoanProduct.product_interest_rate}
                        onChange={handleAddLoanProductChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-gray-700">Processing Fees:</label>
                      <input
                        type="text"
                        name="product_processing_fee"
                        value={newLoanProduct.product_processing_fee}
                        onChange={handleAddLoanProductChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-gray-700">Prepayment Charges:</label>
                      <input
                        type="text"
                        name="product_prepayment_charge"
                        value={newLoanProduct.product_prepayment_charge}
                        onChange={handleAddLoanProductChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-gray-700">Prepayment Conditions:</label>
                      <input
                        type="text"
                        name="product_prepayment_conditions"
                        value={newLoanProduct.product_prepayment_conditions}
                        onChange={handleAddLoanProductChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                  </div>
                  <button onClick={handleAddLoanProduct} className="mt-3 bg-blue-700 text-white py-2 px-4 rounded">Add</button>
                </div>
              )}
            </div>
          </div>
        )}
        {showSaveButton && (
          <button onClick={handleSave} className="mt-5 bg-blue-700 text-white py-2 px-4 rounded">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateVendor;

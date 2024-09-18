import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AddLoanProducts = () => {
  const { vendorId } = useParams();
  const [loanProducts, setLoanProducts] = useState({
    Gold: {},
    Personal: {},
    Home: {}
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductChange = (product, key, value) => {
    setLoanProducts(prevState => ({
      ...prevState,
      [product]: {
        ...prevState[product],
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const product of selectedProducts) {
        const productData = loanProducts[product];
        const response = await axios.post('http://localhost:8084/loan-products/add', {
          product_name: product,
          product_interest_rate: productData.interestRate,
          product_processing_fee: productData.processingFee,
          product_prepayment_charge: productData.prepaymentCharge,
          product_prepayment_conditions: productData.prepaymentConditions
        });

        const loanProductId = response.data.product_id;

        await axios.patch(`http://localhost:8084/loan-products/partial-update/${loanProductId}`, {
          vendor_id: vendorId
        });
      }

      alert('Vendor and Loan Products successfully added. Redirecting back to dashboard in 5 seconds.');
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    } catch (error) {
      console.error('Error adding loan products', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col items-center p-5 bg-[#E7EEE1] min-h-screen">
        <h2 className="text-2xl font-bold mb-5">Add Loan Products</h2>
        <form onSubmit={handleSubmit} className="bg-[#5F7A61] p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <p className="text-lg font-semibold mb-3 text-white">Choose Loan Products:</p>
          <div className="space-y-4">
            {['Gold', 'Personal', 'Home'].map((product) => (
              <div key={product} className="bg-gray-100 p-5 rounded-lg shadow-inner">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product]);
                      } else {
                        setSelectedProducts(selectedProducts.filter(p => p !== product));
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <span className="text-lg">{product}</span>
                </label>
                {selectedProducts.includes(product) && (
                  <div className="mt-3 grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700">Interest Rate:</label>
                      <input
                        type="number"
                        step="0.01"
                        value={loanProducts[product].interestRate || ''}
                        onChange={(e) => handleProductChange(product, 'interestRate', e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Processing Fee:</label>
                      <input
                        type="number"
                        step="0.01"
                        value={loanProducts[product].processingFee || ''}
                        onChange={(e) => handleProductChange(product, 'processingFee', e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700">PrePayment Charges:</label>
                      <input
                        type="number"
                        step="0.01"
                        value={loanProducts[product].prepaymentCharge || ''}
                        onChange={(e) => handleProductChange(product, 'prepaymentCharge', e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700">PrePayment Conditions:</label>
                      <input
                        type="text"
                        value={loanProducts[product].prepaymentConditions || ''}
                        onChange={(e) => handleProductChange(product, 'prepaymentConditions', e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <button type="submit" className="bg-[#B9D79F] text-black py-2 px-4 rounded">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoanProducts;

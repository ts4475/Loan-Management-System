// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/UserContext';
// import LoanApplicationService from '../services/loanApplicationService';
// import DocumentsService from '../services/DocumentsService';

// const Tracking2 = () => {
//     const { user } = useContext(UserContext);
//     const { application_id } = useParams();
//     const [application, setApplication] = useState(null);
//     const [product, setProduct] = useState(null);
//     const [vendor, setVendor] = useState(null);
//     const [documents, setDocuments] = useState({ Aadhar: '', PAN: '', Bank_Statement: '' });
//     const navigate = useNavigate();

//     useEffect(() => {
//         LoanApplicationService.getApplicationById(application_id)
//             .then(response => {
//                 setApplication(response.data);
//                 axios.get(`http://localhost:8084/loan-products/readOne/${response.data.product.product_id}`)
//                     .then(productResponse => {
//                         setProduct(productResponse.data);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching product details', error);
//                     });
//                 axios.get(`http://localhost:8084/vendors/readOne/${response.data.vendor.vendor_id}`)
//                     .then(vendorResponse => {
//                         setVendor(vendorResponse.data);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching vendor details', error);
//                     });
//             })
//             .catch(error => {
//                 console.error('Error fetching application details', error);
//             });
//     }, [application_id]);

//     const handleCancel = () => {
//         if (window.confirm('Are you sure you want to cancel this application?')) {
//             DocumentsService.deleteDocumentsByApplicationId(application_id)
//                 .then(() => {
//                     LoanApplicationService.deleteLoanApplication(application_id)
//                         .then(() => {
//                             alert('Application deleted successfully. Redirecting to Customer Dashboard in 5 seconds.');
//                             setTimeout(() => {
//                                 navigate('/dashboard');
//                             }, 5000);
//                         })
//                         .catch(error => {
//                             console.error('Error deleting documents', error);
//                         });
//                 })
//                 .catch(error => {
//                     console.error('Error deleting application', error);
//                 });
//         }
//     };


//     const handleInputChange = (event, documentType) => {
//         setDocuments({
//             ...documents,
//             [documentType]: event.target.value
//         });
//     };

//     const handleSubmitDocuments = () => {
//         const documentData = Object.keys(documents).map(key => ({
//             document_type: key,
//             document_url: documents[key],
//             loanApplication: { application_id: application_id } // Set the application_id here
//         }));

//         DocumentsService.uploadDocuments(documentData)
//             .then(() => {
//                 LoanApplicationService.updateApplicationStatus(application_id, 'Docs_Submitted')
//                     .then(() => {
//                         alert('Documents have been uploaded successfully. Redirecting to Dashboard in 5 seconds.');
//                         setTimeout(() => {
//                             navigate('/dashboard');
//                         }, 5000);
//                     })
//                     .catch(error => {
//                         console.error('Error updating application status', error);
//                     });
//             })
//             .catch(error => {
//                 console.error('Error uploading documents', error);
//             });
//     };

//     const handleGoBack = () => {
//         navigate('/dashboard');
//     };

//     const calculateEMI = (principal, rate, tenure) => {
//         const monthlyRate = rate / 12 / 100;
//         const numPayments = tenure * 12;
//         return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
//     };

//     if (!application || !product || !vendor) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Tracking 2 Page</h2>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '45%' }}>
//                     <h3>Loan Details</h3>
//                     <p><strong>Application ID:</strong> {application.application_id}</p>
//                     <p><strong>Amount Required:</strong> {application.amount_required}</p>
//                     <p><strong>Product Type:</strong> {product.product_name}</p>
//                     <p><strong>Interest Rate:</strong> {product.product_interest_rate}%</p>
//                     <p><strong>Processing Fee:</strong> {product.product_processing_fee}</p>
//                     <p><strong>Prepayment Charges:</strong> {product.product_prepayment_charge}%</p>
//                     <p><strong>Prepayment Conditions:</strong> {product.product_prepayment_conditions}</p>
//                     <p><strong>Vendor Name:</strong> {vendor.vendor_name}</p>
//                     <p><strong>Vendor Logo:</strong> <img src={vendor.vendor_logo} alt={vendor.vendor_name} width="50" height="50" /></p>
//                     <p><strong>Tenure:</strong> {application.tenure} years</p>
//                     <p><strong>EMI:</strong> {calculateEMI(application.amount_required, product.product_interest_rate, application.tenure).toFixed(2)}</p>
//                 </div>
//                 <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '45%' }}>
//                     <h3>Application Status</h3>
//                     <p>Application Submitted (Submitted at {new Date(application.created_at).toLocaleString()})</p>
//                     <input type="radio" checked readOnly style={{ accentColor: 'green' }} />
//                     <h4>Submit Your Documents</h4>
//                     <div>
//                         <label>Aadhar URL:</label>
//                         <input type="text" value={documents.Aadhar} onChange={(e) => handleInputChange(e, 'Aadhar')} />
//                     </div>
//                     <div>
//                         <label>PAN URL:</label>
//                         <input type="text" value={documents.PAN} onChange={(e) => handleInputChange(e, 'PAN')} />
//                     </div>
//                     <div>
//                         <label>Bank Statement URL:</label>
//                         <input type="text" value={documents.Bank_Statement} onChange={(e) => handleInputChange(e, 'Bank_Statement')} />
//                     </div>
//                     <button onClick={handleSubmitDocuments}>Submit</button>
//                 </div>
//             </div>
//             <button onClick={handleCancel}>Cancel Application</button>
//             <button onClick={handleGoBack}>Go Back to Dashboard</button>
//         </div>
//     );
// };

// export default Tracking2;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import LoanApplicationService from '../services/loanApplicationService';
import DocumentsService from '../services/DocumentsService';
import Navbar from './Navbar';
 
const Tracking2 = () => {
    const { user } = useContext(UserContext);
    const { application_id } = useParams();
    const [application, setApplication] = useState(null);
    const [product, setProduct] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [documents, setDocuments] = useState({ Aadhar: '', PAN: '', Bank_Statement: '' });
    const navigate = useNavigate();
 
    useEffect(() => {
        LoanApplicationService.getApplicationById(application_id)
            .then(response => {
                setApplication(response.data);
                axios.get(`http://localhost:8084/loan-products/readOne/${response.data.product.product_id}`)
                    .then(productResponse => {
                        setProduct(productResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching product details', error);
                    });
                axios.get(`http://localhost:8084/vendors/readOne/${response.data.vendor.vendor_id}`)
                    .then(vendorResponse => {
                        setVendor(vendorResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching vendor details', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching application details', error);
            });
    }, [application_id]);
 
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel this application?')) {
            DocumentsService.deleteDocumentsByApplicationId(application_id)
                .then(() => {
                    LoanApplicationService.deleteLoanApplication(application_id)
                        .then(() => {
                            alert('Application deleted successfully. Redirecting to Customer Dashboard in 5 seconds.');
                            setTimeout(() => {
                                navigate('/dashboard');
                            }, 5000);
                        })
                        .catch(error => {
                            console.error('Error deleting documents', error);
                        });
                })
                .catch(error => {
                    console.error('Error deleting application', error);
                });
        }
    };
 
    const handleInputChange = (event, documentType) => {
        setDocuments({
            ...documents,
            [documentType]: event.target.value
        });
    };
 
    const handleSubmitDocuments = () => {
        const documentData = Object.keys(documents).map(key => ({
            document_type: key,
            document_url: documents[key],
            loanApplication: { application_id: application_id } // Set the application_id here
        }));
 
        DocumentsService.uploadDocuments(documentData)
            .then(() => {
                LoanApplicationService.updateApplicationStatus(application_id, 'Docs_Submitted')
                    .then(() => {
                        alert('Documents have been uploaded successfully. Redirecting to Dashboard in 5 seconds.');
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 5000);
                    })
                    .catch(error => {
                        console.error('Error updating application status', error);
                    });
            })
            .catch(error => {
                console.error('Error uploading documents', error);
            });
    };
 
    const handleGoBack = () => {
        navigate('/dashboard');
    };
 
    const calculateEMI = (principal, rate, tenure) => {
        const monthlyRate = rate / 12 / 100;
        const numPayments = tenure * 12;
        return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    };
 
    if (!application || !product || !vendor) {
        return <div>Loading...</div>;
    }
 
    return (
        <div className="min-h-screen flex flex-col items-center bg-[#E7EEE1]">
            <Navbar/>
            <br/>
            <h2 className="text-2xl font-bold mb-6">Tracking 2 Page</h2>
            <div className="flex justify-between items-start mb-6 bg-[#B9D79F] p-4 rounded-lg w-full max-w-6xl">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mr-4">
                    <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
                    <p><strong>Application ID:</strong> {application.application_id}</p>
                    <p><strong>Amount Required:</strong> {application.amount_required}</p>
                    <p><strong>Product Type:</strong> {product.product_name}</p>
                    <p><strong>Interest Rate:</strong> {product.product_interest_rate}%</p>
                    <p><strong>Processing Fee:</strong> {product.product_processing_fee}</p>
                    <p><strong>Prepayment Charges:</strong> {product.product_prepayment_charge}%</p>
                    <p><strong>Prepayment Conditions:</strong> {product.product_prepayment_conditions}</p>
                    <p><strong>Vendor Name:</strong> {vendor.vendor_name}</p>
                    <p><strong>Vendor Logo:</strong> <img src={vendor.vendor_logo} alt={vendor.vendor_name} className="w-12 h-12 inline-block" /></p>
                    <p><strong>Tenure:</strong> {application.tenure} years</p>
                    <p><strong>EMI:</strong> ₹{calculateEMI(application.amount_required, product.product_interest_rate, application.tenure).toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h3 className="text-xl font-semibold mb-4">Application Status</h3>
                    <p>Application Submitted (Submitted at {new Date(application.created_at).toLocaleString()})</p>
                    <input type="radio" checked readOnly className="text-green-500" />
                    <h4 className="text-lg font-semibold mt-4">Submit Your Documents</h4>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar URL:</label>
                        <input type="text"  value={documents.Aadhar} onChange={(e) => handleInputChange(e, 'Aadhar')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN URL:</label>
                        <input type="text" value={documents.PAN} onChange={(e) => handleInputChange(e, 'PAN')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Statement URL:</label>
                        <input type="text" value={documents.Bank_Statement} onChange={(e) => handleInputChange(e, 'Bank_Statement')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <button onClick={handleSubmitDocuments} className="mt-4 bg-green-700 text-white py-2 px-4 rounded">Submit</button>
                </div>
            </div>
            <div className="flex justify-between w-full max-w-6xl">
                <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancel Application</button>
                <button onClick={handleGoBack} className="bg-gray-500 text-white py-2 px-4 rounded">Go Back to Dashboard</button>
            </div>
        </div>
    );
};
 
export default Tracking2;
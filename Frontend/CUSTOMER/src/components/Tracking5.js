// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/UserContext';
// import LoanApplicationService from '../services/loanApplicationService';
// import DocumentsService from '../services/DocumentsService';

// const Tracking5 = () => {
//     const { user } = useContext(UserContext);
//     const { application_id } = useParams();
//     const [application, setApplication] = useState(null);
//     const [product, setProduct] = useState(null);
//     const [vendor, setVendor] = useState(null);
//     const [documents, setDocuments] = useState([]);
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
//                 DocumentsService.getDocumentsByApplicationId(application_id)
//                     .then(docResponse => {
//                         setDocuments(docResponse.data);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching documents', error);
//                     });
//             })
//             .catch(error => {
//                 console.error('Error fetching application details', error);
//             });
//     }, [application_id]);

//     const calculateEMI = (principal, rate, tenure) => {
//         const monthlyRate = rate / 12 / 100;
//         const numPayments = tenure * 12;
//         return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
//     };

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

//     const handleGoBack = () => {
//         navigate('/dashboard');
//     };

//     if (!application || !product || !vendor || documents.length === 0) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Tracking 5 Page</h2>
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
//                     <p>Documents Resubmitted</p>
//                     {documents.map(doc => (
//                         <div key={doc.document_id}>
//                             <p>{doc.document_type}</p>
//                             <a href={doc.document_url} target="_blank" rel="noopener noreferrer">View</a>
//                             <a href={doc.document_url} download>Download</a>
//                             {['pdf', 'jpg', 'jpeg', 'png'].includes(doc.document_url.split('.').pop().toLowerCase()) && (
//                                 <div>
//                                     {doc.document_url.split('.').pop().toLowerCase() === 'pdf' ? (
//                                         <embed src={doc.document_url} width="200" height="200" type="application/pdf" />
//                                     ) : (
//                                         <img src={doc.document_url} alt={doc.document_type} width="200" height="200" />
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                     <input type="radio" checked readOnly style={{ accentColor: 'green' }} />
//                     <p>Document Verification Pending</p>
//                     <input type="radio" checked readOnly style={{ accentColor: 'yellow' }} />
//                 </div>
//             </div>
//             <button onClick={handleGoBack}>Go Back to Dashboard</button>
//             <button onClick={handleCancel} style={{ marginLeft: '20px' }}>Cancel Application</button>
//         </div>
//     );
// };

// export default Tracking5;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import LoanApplicationService from '../services/loanApplicationService';
import DocumentsService from '../services/DocumentsService';
import Navbar from './Navbar';
 
const Tracking5 = () => {
    const { user } = useContext(UserContext);
    const { application_id } = useParams();
    const [application, setApplication] = useState(null);
    const [product, setProduct] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [documents, setDocuments] = useState([]);
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

                DocumentsService.getDocumentsByApplicationId(application_id)
                    .then(docResponse => {
                        setDocuments(docResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching documents', error);
                    });
            })

            .catch(error => {
                console.error('Error fetching application details', error);
            });
    }, [application_id]); 
    const calculateEMI = (principal, rate, tenure) => {
        const monthlyRate = rate / 12 / 100;
        const numPayments = tenure * 12;
        return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    };
 
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
 
    const handleGoBack = () => {
        navigate('/dashboard');
    };
 
    if (!application || !product || !vendor || documents.length === 0) {
        return <div>Loading...</div>;
    }
     return (
        <div className="min-h-screen flex flex-col items-center bg-[#E7EEE1]">
            <Navbar/>
            <br/>
            <h2 className="text-2xl font-bold mb-6">Tracking 5 Page</h2>
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
                    <p>Documents Resubmitted</p>
                    {documents.map(doc => (
                        <div key={doc.document_id} className="mt-2">
                            <p className="block text-sm font-medium text-gray-700 mb-1">{doc.document_type}</p>
                            <a href={doc.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                            <a href={doc.document_url} download className="text-blue-500 hover:underline ml-2">Download</a>
                            {['pdf', 'jpg', 'jpeg', 'png'].includes(doc.document_url.split('.').pop().toLowerCase()) && (
                                <div className="mt-2">
                                    {doc.document_url.split('.').pop().toLowerCase() === 'pdf' ? (
                                        <embed src={doc.document_url} width="200" height="200" type="application/pdf" />
                                    ) : (
                                        <img src={doc.document_url} alt={doc.document_type} className="w-48 h-48" />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <p>Document Verification Pending</p>
                    <input type="radio" checked readOnly className="text-yellow-500" />
                </div>
            </div>
            <div className="flex justify-between w-full max-w-6xl">
                <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancel Application</button>
                <button onClick={handleGoBack} className="bg-gray-500 text-white py-2 px-4 rounded">Go Back to Dashboard</button>
            </div>
        </div>
    );

};
 
export default Tracking5;

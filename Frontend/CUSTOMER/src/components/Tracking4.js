// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/UserContext';
// import LoanApplicationService from '../services/loanApplicationService';
// import DocumentsService from '../services/DocumentsService';

// const Tracking4 = () => {
//     const { user } = useContext(UserContext);
//     const { application_id } = useParams();
//     const [application, setApplication] = useState(null);
//     const [product, setProduct] = useState(null);
//     const [vendor, setVendor] = useState(null);
//     const [documents, setDocuments] = useState([]);
//     const [documentUrls, setDocumentUrls] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         LoanApplicationService.getApplicationById(application_id)
//             .then(response => {
//                 setApplication(response.data);
//                 // Fetch product details
//                 axios.get(`http://localhost:8084/loan-products/readOne/${response.data.product.product_id}`)
//                     .then(productResponse => {
//                         setProduct(productResponse.data);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching product details', error);
//                     });
//                 // Fetch vendor details
//                 axios.get(`http://localhost:8084/vendors/readOne/${response.data.vendor.vendor_id}`)
//                     .then(vendorResponse => {
//                         setVendor(vendorResponse.data);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching vendor details', error);
//                     });
//                 // Fetch documents marked as NotOK
//                 DocumentsService.getDocumentsByApplicationId(application_id)
//                     .then(docResponse => {
//                         const notOkDocs = docResponse.data.filter(doc => doc.document_status === 'NotOK');
//                         setDocuments(notOkDocs);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching documents', error);
//                     });
//             })
//             .catch(error => {
//                 console.error('Error fetching application details', error);
//             });
//     }, [application_id]);

//     const handleUrlChange = (event, documentType) => {
//         setDocumentUrls({
//             ...documentUrls,
//             [documentType]: event.target.value
//         });
//     };

//     const handleSubmit = () => {
//         documents.forEach(doc => {
//             if (documentUrls[doc.document_type]) {
//                 DocumentsService.updateDocumentUrl(doc.document_id, documentUrls[doc.document_type])
//                     .then(() => {
//                         LoanApplicationService.updateApplicationStatus(application_id, 'Docs_Resubmitted')
//                             .then(() => {
//                                 alert('Documents have been uploaded successfully. Redirecting to Dashboard in 5 seconds.');
//                                 setTimeout(() => {
//                                     navigate('/dashboard');
//                                 }, 5000);
//                             })
//                             .catch(error => {
//                                 console.error('Error updating application status', error);
//                             });
//                     })
//                     .catch(error => {
//                         console.error('Error updating document URL', error);
//                     });
//             }
//         });
//     };

//     const handleGoBack = () => {
//         navigate('/dashboard');
//     };

//     const handleCancel = () => {
//         if (window.confirm('Are you sure you want to delete this application?')) {
//             DocumentsService.deleteDocumentsByApplicationId(application_id)
//                 .then(() => {
//                     LoanApplicationService.deleteApplication(application_id)
//                         .then(() => {
//                             alert('Loan application cancelled successfully. Redirecting to Customer Dashboard in 5 seconds.');
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
//             <h2>Tracking 4 Page</h2>
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
//                     <h3>Document Reupload</h3>
//                     <p>Some Documents have been marked for reupload. Kindly Reupload them again.</p>
//                     <p><strong>Review Message from Loan Officer:</strong> {application.review_message}</p>
//                     {documents.map(doc => (
//                         <div key={doc.document_id}>
//                             <label>{doc.document_type} URL:</label>
//                             <input type="text" value={documentUrls[doc.document_type] || ''} onChange={(e) => handleUrlChange(e, doc.document_type)} />
//                         </div>
//                     ))}
//                     <button onClick={handleSubmit}>Submit</button>
//                 </div>
//             </div>
//             <button onClick={handleCancel}>Cancel Application</button>
//             <button onClick={handleGoBack} style={{ marginLeft: '20px' }}>Go Back to Dashboard</button>
//         </div>
//     );
// };

// export default Tracking4;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import LoanApplicationService from '../services/loanApplicationService';
import DocumentsService from '../services/DocumentsService';
import Navbar from './Navbar';
 
const Tracking4 = () => {
    const { user } = useContext(UserContext);
    const { application_id } = useParams();
    const [application, setApplication] = useState(null);
    const [product, setProduct] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [documentUrls, setDocumentUrls] = useState({});
    const navigate = useNavigate();
 
    useEffect(() => {
        LoanApplicationService.getApplicationById(application_id)
            .then(response => {
                setApplication(response.data);
                // Fetch product details
                axios.get(`http://localhost:8084/loan-products/readOne/${response.data.product.product_id}`)
                    .then(productResponse => {
                        setProduct(productResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching product details', error);
                    });
                // Fetch vendor details
                axios.get(`http://localhost:8084/vendors/readOne/${response.data.vendor.vendor_id}`)
                    .then(vendorResponse => {
                        setVendor(vendorResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching vendor details', error);
                    });
                // Fetch documents marked as NotOK
                DocumentsService.getDocumentsByApplicationId(application_id)
                    .then(docResponse => {
                        const notOkDocs = docResponse.data.filter(doc => doc.document_status === 'NotOK');
                        setDocuments(notOkDocs);
                    })
                    .catch(error => {
                        console.error('Error fetching documents', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching application details', error);
            });
    }, [application_id]);
 
    const handleUrlChange = (event, documentType) => {
        setDocumentUrls({
            ...documentUrls,
            [documentType]: event.target.value
        });
    };
 
    const handleSubmit = () => {
        documents.forEach(doc => {
            if (documentUrls[doc.document_type]) {
                DocumentsService.updateDocumentUrl(doc.document_id, documentUrls[doc.document_type])
                    .then(() => {
                        LoanApplicationService.updateApplicationStatus(application_id, 'Docs_Resubmitted')
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
                        console.error('Error updating document URL', error);
                    });
            }
        });
    };
 
    const handleGoBack = () => {
        navigate('/dashboard');
    };
 
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            DocumentsService.deleteDocumentsByApplicationId(application_id)
                .then(() => {
                    LoanApplicationService.deleteApplication(application_id)
                        .then(() => {
                            alert('Loan application cancelled successfully. Redirecting to Customer Dashboard in 5 seconds.');
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
            <h2 className="text-2xl font-bold mb-6">Tracking 4 Page</h2>
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
                    <h3 className="text-xl font-semibold mb-4">Document Reupload</h3>
                    <p>Some Documents have been marked for reupload. Kindly Reupload them again.</p>
                    <p><strong>Review Message from Loan Officer:</strong> {application.review_message}</p>
                    {documents.map(doc => (
                        <div key={doc.document_id} className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{doc.document_type} URL:</label>
                            <input
                                type="text"
                                value={documentUrls[doc.document_type] || ''}
                                onChange={(e) => handleUrlChange(e, doc.document_type)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit} className="mt-4 bg-green-700 text-white py-2 px-4 rounded">Submit</button>
                </div>
            </div>
            <div className="flex justify-between w-full max-w-6xl">
                <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancel Application</button>
                <button onClick={handleGoBack} className="bg-gray-500 text-white py-2 px-4 rounded">Go Back to Dashboard</button>
            </div>
        </div>
    );
};
 
export default Tracking4;

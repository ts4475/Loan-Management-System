// // Dashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';

// const Dashboard = () => {
//   const [officerName, setOfficerName] = useState('');
//   const [newApplications, setNewApplications] = useState([]);
//   const [documentVerification, setDocumentVerification] = useState([]);
//   const [vendorId, setVendorId] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('user_id');
//     if (userId) {
//       // Fetch user details
//       axios.get(`http://localhost:8082/users/readOne/${userId}`)
//         .then(response => {
//           const user = response.data;
//           setOfficerName(`${user.first_name} ${user.last_name}`);
//         })
//         .catch(error => {
//           console.error('Error fetching officer name:', error);
//         });

//       // Fetch vendor_id from the managers table
//       axios.get(`http://localhost:8084/managers/read`)
//         .then(response => {
//           const allManagers = response.data;
//           const currentManager = allManagers.find(manager => manager.user.user_id === parseInt(userId));
//           if (currentManager) {
//             setVendorId(currentManager.vendor.vendor_id);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching manager details:', error);
//         });
//     }
//   }, []);

//   useEffect(() => {
//     if (vendorId) {
//       // Fetch new applications using the vendor_id
//       axios.get(`http://localhost:8083/loan-applications/read`)
//         .then(response => {
//           const applications = response.data.filter(application => 
//             application.status === 'Application_Submitted' && 
//             application.vendor.vendor_id === vendorId
//           );

//           // Fetch user details for each application
//           const userPromises = applications.map(application => 
//             axios.get(`http://localhost:8082/users/readOne/${application.user.user_id}`)
//           );

//           Promise.all(userPromises)
//             .then(usersResponses => {
//               const applicationsWithUserDetails = applications.map((application, index) => ({
//                 ...application,
//                 user: usersResponses[index].data,
//               }));
//               setNewApplications(applicationsWithUserDetails);
//             })
//             .catch(error => {
//               console.error('Error fetching user details:', error);
//             });
//         })
//         .catch(error => {
//           console.error('Error fetching new applications:', error);
//         });

//       // Fetch document verification applications
//       axios.get(`http://localhost:8083/loan-applications/read`)
//         .then(response => {
//           const applications = response.data.filter(application => 
//             application.status === 'Docs_Submitted' && 
//             application.vendor.vendor_id === vendorId
//           );

//           // Fetch additional details for each application
//           const userPromises = applications.map(application => 
//             axios.get(`http://localhost:8082/users/readOne/${application.user.user_id}`)
//           );
//           const productPromises = applications.map(application => 
//             axios.get(`http://localhost:8084/loan-products/readOne/${application.product.product_id}`)
//           );
//           const documentPromises = applications.map(application => 
//             axios.get(`http://localhost:8083/documents/byApplication/${application.application_id}`)
//           );

//           Promise.all([...userPromises, ...productPromises, ...documentPromises])
//             .then(responses => {
//               const usersResponses = responses.slice(0, applications.length);
//               const productsResponses = responses.slice(applications.length, applications.length * 2);
//               const documentsResponses = responses.slice(applications.length * 2);

//               const applicationsWithDetails = applications.map((application, index) => ({
//                 ...application,
//                 user: usersResponses[index].data,
//                 product: productsResponses[index].data,
//                 documents: documentsResponses[index].data,
//               }));
//               setDocumentVerification(applicationsWithDetails);
//             })
//             .catch(error => {
//               console.error('Error fetching additional details:', error);
//             });
//         })
//         .catch(error => {
//           console.error('Error fetching document verification applications:', error);
//         });
//     }
//   }, [vendorId]);

//   const handleGetDocuments = (applicationId) => {
//     axios.put(`http://localhost:8083/loan-applications/updateStatus/${applicationId}?status=Submit_Docs`)
//       .then(response => {
//         setNewApplications(prevApplications =>
//           prevApplications.filter(app => app.application_id !== applicationId)
//         );
//       })
//       .catch(error => {
//         console.error('Error updating application status:', error);
//       });
//   };

//   const handleRejectApplication = (applicationId) => {
//     axios.delete(`http://localhost:8083/documents/deleteByApplication/${applicationId}`)
//       .then(response => {
//         axios.delete(`http://localhost:8083/loan-applications/delete/${applicationId}`)
//           .then(response => {
//             setNewApplications(prevApplications =>
//               prevApplications.filter(app => app.application_id !== applicationId)
//             );
//           })
//           .catch(error => {
//             console.error('Error deleting application:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error deleting documents:', error);
//       });
//   };

//   // const handleResubmitDocs = (application) => {
//   //   const { application_id, documents } = application;
//   //   const reviewMessage = document.getElementById(`review-${application_id}`).value;
//   //   const updatePromises = documents.map(doc => {
//   //     const documentStatus = document.getElementById(`doc-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
//   //     return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
//   //   });

//   //   Promise.all(updatePromises)
//   //     .then(() => {
//   //       return axios.put(`http://localhost:8083/loan-applications/update/${application_id}`, { status: 'Resubmit_Docs', review_message: reviewMessage });
//   //     })
//   //     .then(() => {
//   //       setDocumentVerification(prevApplications =>
//   //         prevApplications.filter(app => app.application_id !== application_id)
//   //       );
//   //     })
//   //     .catch(error => {
//   //       console.error('Error resubmitting documents:', error);
//   //     });
//   // };

//   const handleResubmitDocs = (application) => {
//     const { application_id, documents } = application;
//     const reviewMessage = document.getElementById(`review-${application_id}`).value;
//     const updatePromises = documents.map(doc => {
//       const documentStatus = document.getElementById(`doc-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
//       return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
//     });
  
//     Promise.all(updatePromises)
//       .then(() => {
//         return axios.patch(`http://localhost:8083/loan-applications/partial-update/${application_id}`, {
//           review_message: reviewMessage,
//           status: 'Resubmit_Docs'
//         });
//       })
//       .then(() => {
//         setDocumentVerification(prevApplications =>
//           prevApplications.filter(app => app.application_id !== application_id)
//         );
//       })
//       .catch(error => {
//         console.error('Error resubmitting documents:', error);
//       });
//   };
  

//   const handleApproveLoan = (application) => {
//     const { application_id, documents } = application;
//     const allDocumentsOk = documents.every(doc => document.getElementById(`doc-ok-${doc.document_id}`).checked);

//     if (!allDocumentsOk) {
//       alert('Some documents are still not OK, cannot approve this loan.');
//       return;
//     }

//     axios.put(`http://localhost:8083/loan-applications/update/${application_id}`, { status: 'Loan_Approved' })
//       .then(() => {
//         setDocumentVerification(prevApplications =>
//           prevApplications.filter(app => app.application_id !== application_id)
//         );
//       })
//       .catch(error => {
//         console.error('Error approving loan:', error);
//       });
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: '20px' }}>
//         <h2>Welcome, {officerName}</h2>
        
//         {/* New Applications Section */}
//         <h3>New Applications</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Application ID</th>
//               <th>Amount Required</th>
//               <th>Tenure</th>
//               <th>User ID</th>
//               <th>Applicant Name</th>
//               <th>Annual Income</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {newApplications.map(application => (
//               <tr key={application.application_id}>
//                 <td>{application.application_id}</td>
//                 <td>{application.amount_required}</td>
//                 <td>{application.tenure}</td>
//                 <td>{application.user.user_id}</td>
//                 <td>{application.user.first_name} {application.user.last_name}</td>
//                 <td>{application.user.annualIncome}</td>
//                 <td>
//                   <button onClick={() => handleGetDocuments(application.application_id)}>Get Documents</button>
//                   <button onClick={() => handleRejectApplication(application.application_id)}>Reject Application</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Document Verification Section */}
//         <h3>Document Verification</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Application ID</th>
//               <th>User ID</th>
//               <th>Applicant Name</th>
//               <th>Annual Income</th>
//               <th>Product Name</th>
//               <th>Documents</th>
//               <th>Review Message</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {documentVerification.map(application => (
//               <tr key={application.application_id}>
//                 <td>{application.application_id}</td>
//                 <td>{application.user.user_id}</td>
//                 <td>{application.user.first_name} {application.user.last_name}</td>
//                 <td>{application.user.annualIncome}</td>
//                 <td>{application.product.product_name}</td>
//                 <td>
//                   {application.documents.map(doc => (
//                     <div key={doc.document_id}>
//                       <img src={doc.document_url} alt={doc.document_type} style={{ width: '100px', height: '100px' }} />
//                       <p>{doc.document_type}</p>
//                       <a href={doc.document_url} target="_blank" rel="noopener noreferrer">View</a> |
//                       <a href={doc.document_url} download>Download</a>
//                       <div>
//                         <input type="checkbox" id={`doc-ok-${doc.document_id}`} /> OK
//                         <input type="checkbox" id={`doc-not-ok-${doc.document_id}`} /> Not OK
//                       </div>
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   <textarea id={`review-${application.application_id}`} placeholder="Enter review comments"></textarea>
//                 </td>
//                 <td>
//                   <button onClick={() => handleResubmitDocs(application)}>Resubmit Docs</button>
//                   <button onClick={() => handleApproveLoan(application)}>Approve Loan</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = () => {
  const [officerName, setOfficerName] = useState('');
  const [newApplications, setNewApplications] = useState([]);
  const [documentVerification, setDocumentVerification] = useState([]);
  const [documentReverification, setDocumentReverification] = useState([]);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      // Fetch user details
      axios.get(`http://localhost:8082/users/readOne/${userId}`)
        .then(response => {
          const user = response.data;
          setOfficerName(`${user.first_name} ${user.last_name}`);
        })
        .catch(error => {
          console.error('Error fetching officer name:', error);
        });

      // Fetch vendor_id from the managers table
      axios.get(`http://localhost:8084/managers/read`)
        .then(response => {
          const allManagers = response.data;
          const currentManager = allManagers.find(manager => manager.user.user_id === parseInt(userId));
          if (currentManager) {
            setVendorId(currentManager.vendor.vendor_id);
          }
        })
        .catch(error => {
          console.error('Error fetching manager details:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (vendorId) {
      // Fetch new applications using the vendor_id
      axios.get(`http://localhost:8083/loan-applications/read`)
        .then(response => {
          const applications = response.data.filter(application => 
            application.status === 'Application_Submitted' && 
            application.vendor.vendor_id === vendorId
          );

          // Fetch user details for each application
          const userPromises = applications.map(application => 
            axios.get(`http://localhost:8082/users/readOne/${application.user.user_id}`)
          );

          Promise.all(userPromises)
            .then(usersResponses => {
              const applicationsWithUserDetails = applications.map((application, index) => ({
                ...application,
                user: usersResponses[index].data,
              }));
              setNewApplications(applicationsWithUserDetails);
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching new applications:', error);
        });

      // Fetch document verification applications
      axios.get(`http://localhost:8083/loan-applications/read`)
        .then(response => {
          const applications = response.data.filter(application => 
            application.status === 'Docs_Submitted' && 
            application.vendor.vendor_id === vendorId
          );

          // Fetch additional details for each application
          const userPromises = applications.map(application => 
            axios.get(`http://localhost:8082/users/readOne/${application.user.user_id}`)
          );
          const productPromises = applications.map(application => 
            axios.get(`http://localhost:8084/loan-products/readOne/${application.product.product_id}`)
          );
          const documentPromises = applications.map(application => 
            axios.get(`http://localhost:8083/documents/byApplication/${application.application_id}`)
          );

          Promise.all([...userPromises, ...productPromises, ...documentPromises])
            .then(responses => {
              const usersResponses = responses.slice(0, applications.length);
              const productsResponses = responses.slice(applications.length, applications.length * 2);
              const documentsResponses = responses.slice(applications.length * 2);

              const applicationsWithDetails = applications.map((application, index) => ({
                ...application,
                user: usersResponses[index].data,
                product: productsResponses[index].data,
                documents: documentsResponses[index].data,
              }));
              setDocumentVerification(applicationsWithDetails);
            })
            .catch(error => {
              console.error('Error fetching additional details:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching document verification applications:', error);
        });

      // Fetch document reverification applications
      axios.get(`http://localhost:8083/loan-applications/read`)
        .then(response => {
          const applications = response.data.filter(application => 
            application.status === 'Docs_Resubmitted' && 
            application.vendor.vendor_id === vendorId
          );

          // Fetch additional details for each application
          const userPromises = applications.map(application => 
            axios.get(`http://localhost:8082/users/readOne/${application.user.user_id}`)
          );
          const productPromises = applications.map(application => 
            axios.get(`http://localhost:8084/loan-products/readOne/${application.product.product_id}`)
          );
          const documentPromises = applications.map(application => 
            axios.get(`http://localhost:8083/documents/byApplication/${application.application_id}`)
          );

          Promise.all([...userPromises, ...productPromises, ...documentPromises])
            .then(responses => {
              const usersResponses = responses.slice(0, applications.length);
              const productsResponses = responses.slice(applications.length, applications.length * 2);
              const documentsResponses = responses.slice(applications.length * 2);

              const applicationsWithDetails = applications.map((application, index) => ({
                ...application,
                user: usersResponses[index].data,
                product: productsResponses[index].data,
                documents: documentsResponses[index].data.filter(doc => doc.document_status === 'NotOK'),
              }));
              setDocumentReverification(applicationsWithDetails);
            })
            .catch(error => {
              console.error('Error fetching additional details:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching document reverification applications:', error);
        });
    }
  }, [vendorId]);

  const handleGetDocuments = (applicationId) => {
    axios.put(`http://localhost:8083/loan-applications/updateStatus/${applicationId}?status=Submit_Docs`)
      .then(response => {
        setNewApplications(prevApplications =>
          prevApplications.filter(app => app.application_id !== applicationId)
        );
      })
      .catch(error => {
        console.error('Error updating application status:', error);
      });
  };

  const handleRejectApplication = (applicationId) => {
    axios.delete(`http://localhost:8083/documents/deleteByApplication/${applicationId}`)
      .then(response => {
        axios.delete(`http://localhost:8083/loan-applications/delete/${applicationId}`)
          .then(response => {
            setNewApplications(prevApplications =>
              prevApplications.filter(app => app.application_id !== applicationId)
            );
          })
          .catch(error => {
            console.error('Error deleting application:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting documents:', error);
      });
  };

  const handleResubmitDocs = (application) => {
    const { application_id, documents } = application;
    const reviewMessage = document.getElementById(`review-${application_id}`).value;
    const updatePromises = documents.map(doc => {
      const documentStatus = document.getElementById(`doc-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
      return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
    });

    Promise.all(updatePromises)
      .then(() => {
        return axios.patch(`http://localhost:8083/loan-applications/partial-update/${application_id}`, {
          review_message: reviewMessage,
          status: 'Resubmit_Docs'
        });
      })
      .then(() => {
        setDocumentVerification(prevApplications =>
          prevApplications.filter(app => app.application_id !== application_id)
        );
      })
      .catch(error => {
        console.error('Error resubmitting documents:', error);
      });
  };

  // const handleApproveLoan = (application) => {
  //   const { application_id, documents } = application;
  //   const allDocumentsOk = documents.every(doc => document.getElementById(`doc-ok-${doc.document_id}`).checked);

  //   if (!allDocumentsOk) {
  //     alert('Some documents are still not OK, cannot approve this loan.');
  //     return;
  //   }

  //   const updatePromises = documents.map(doc => {
  //     const documentStatus = document.getElementById(`doc-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
  //     return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
  //   });

  //   Promise.all(updatePromises)
  //     .then(() => {
  //       return axios.patch(`http://localhost:8083/loan-applications/partial-update/${application_id}`, {
  //         status: 'Loan_Approved'
  //       });
  //     })
  //     .then(() => {
  //       setDocumentVerification(prevApplications =>
  //         prevApplications.filter(app => app.application_id !== application_id)
  //       );
  //     })
  //     .catch(error => {
  //       console.error('Error approving loan:', error);
  //     });
  // };

  const handleApproveLoan = (application) => {
    const { application_id, documents } = application;
    const allDocumentsOk = documents.every(doc => document.getElementById(`doc-ok-${doc.document_id}`).checked);

    if (!allDocumentsOk) {
      alert('Some documents are still not OK, cannot approve this loan.');
      return;
    }

    const reviewMessage = document.getElementById(`review-${application_id}`).value;
    const updatePromises = documents.map(doc => {
      const documentStatus = document.getElementById(`doc-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
      return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
    });

    Promise.all(updatePromises)
      .then(() => {
        return axios.patch(`http://localhost:8083/loan-applications/partial-update/${application_id}`, {
          review_message: reviewMessage,
          status: 'Loan_Approved'
        });
      })
      .then(() => {
        setDocumentVerification(prevApplications =>
          prevApplications.filter(app => app.application_id !== application_id)
        );
      })
      .catch(error => {
        console.error('Error approving loan:', error);
      });
  };

  const handleReverificationResubmitDocs = (application) => {
    const { application_id, documents } = application;
    const reviewMessage = document.getElementById(`review-reverify-${application_id}`).value;
    const updatePromises = documents.map(doc => {
      const documentStatus = document.getElementById(`doc-reverify-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
      return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
    });

    Promise.all(updatePromises)
      .then(() => {
        return axios.patch(`http://localhost:8083/loan-applications/partial-update/${application_id}`, {
          review_message: reviewMessage,
          status: 'Resubmit_Docs'
        });
      })
      .then(() => {
        setDocumentReverification(prevApplications =>
          prevApplications.filter(app => app.application_id !== application_id)
        );
      })
      .catch(error => {
        console.error('Error resubmitting documents:', error);
      });
  };

  const handleReverificationApproveLoan = (application) => {
    const { application_id, documents } = application;
    const allDocumentsOk = documents.every(doc => document.getElementById(`doc-reverify-ok-${doc.document_id}`).checked);

    if (!allDocumentsOk) {
      alert('Some documents are still not OK, cannot approve this loan.');
      return;
    }

    const reviewMessage = document.getElementById(`review-reverify-${application_id}`).value;
    const updatePromises = documents.map(doc => {
      const documentStatus = document.getElementById(`doc-reverify-ok-${doc.document_id}`).checked ? 'OK' : 'NotOK';
      return axios.put(`http://localhost:8083/documents/update/${doc.document_id}`, { document_status: documentStatus });
    });

    Promise.all(updatePromises)
      .then(() => {
        return axios.patch(`http://localhost:8083/loan-applications/partial-update/${application_id}`, {
          review_message: reviewMessage,
          status: 'Loan_Approved'
        });
      })
      .then(() => {
        setDocumentReverification(prevApplications =>
          prevApplications.filter(app => app.application_id !== application_id)
        );
      })
      .catch(error => {
        console.error('Error approving loan:', error);
      });
  };

  const handleReverificationRejectApplication = (applicationId) => {
    axios.delete(`http://localhost:8083/documents/deleteByApplication/${applicationId}`)
      .then(response => {
        axios.delete(`http://localhost:8083/loan-applications/delete/${applicationId}`)
          .then(response => {
            setDocumentReverification(prevApplications =>
              prevApplications.filter(app => app.application_id !== applicationId)
            );
          })
          .catch(error => {
            console.error('Error deleting application:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting documents:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Welcome, {officerName}</h2>
        
        {/* New Applications Section */}
        <h3>New Applications</h3>
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Amount Required</th>
              <th>Tenure</th>
              <th>User ID</th>
              <th>Applicant Name</th>
              <th>Annual Income</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newApplications.map(application => (
              <tr key={application.application_id}>
                <td>{application.application_id}</td>
                <td>{application.amount_required}</td>
                <td>{application.tenure}</td>
                <td>{application.user.user_id}</td>
                <td>{application.user.first_name} {application.user.last_name}</td>
                <td>{application.user.annualIncome}</td>
                <td>
                  <button onClick={() => handleGetDocuments(application.application_id)}>Get Documents</button>
                  <button onClick={() => handleRejectApplication(application.application_id)}>Reject Application</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Document Verification Section */}
        <h3>Document Verification</h3>
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>User ID</th>
              <th>Applicant Name</th>
              <th>Annual Income</th>
              <th>Product Name</th>
              <th>Documents</th>
              <th>Review Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentVerification.map(application => (
              <tr key={application.application_id}>
                <td>{application.application_id}</td>
                <td>{application.user.user_id}</td>
                <td>{application.user.first_name} {application.user.last_name}</td>
                <td>{application.user.annualIncome}</td>
                <td>{application.product.product_name}</td>
                <td>
                  {application.documents.map(doc => (
                    <div key={doc.document_id}>
                      {/* <img src={doc.document_url} alt={doc.document_type} style={{ width: '100px', height: '100px' }} /> */}
                      <p>{doc.document_type}</p>
                      <a href={doc.document_url} target="_blank" rel="noopener noreferrer">View</a> |
                      <a href={doc.document_url} download>Download</a>
                      {['pdf', 'jpg', 'jpeg', 'png'].includes(doc.document_url.split('.').pop().toLowerCase()) && (
                                <div>
                                    {doc.document_url.split('.').pop().toLowerCase() === 'pdf' ? (
                                        <embed src={doc.document_url} width="200" height="200" type="application/pdf" />
                                    ) : (
                                        <img src={doc.document_url} alt={doc.document_type} width="200" height="200" />
                                    )}
                                </div>
                            )}
                      <div>
                        <input type="checkbox" id={`doc-ok-${doc.document_id}`} /> OK
                        <input type="checkbox" id={`doc-not-ok-${doc.document_id}`} /> Not OK
                      </div>
                    </div>
                  ))}
                </td>
                <td>
                  <textarea id={`review-${application.application_id}`} placeholder="Enter review comments"></textarea>
                </td>
                <td>
                  <button onClick={() => handleResubmitDocs(application)}>Resubmit Docs</button>
                  <button onClick={() => handleApproveLoan(application)}>Approve Loan</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Document Reverification Section */}
        <h3>Document Reverification</h3>
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>User ID</th>
              <th>Amount Required</th>
              <th>Tenure</th>
              <th>Applicant Name</th>
              <th>Annual Income</th>
              <th>Product Name</th>
              <th>Documents</th>
              <th>Review Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentReverification.map(application => (
              <tr key={application.application_id}>
                <td>{application.application_id}</td>
                <td>{application.user.user_id}</td>
                <td>{application.amount_required}</td>
                <td>{application.tenure}</td>
                <td>{application.user.first_name} {application.user.last_name}</td>
                <td>{application.user.annualIncome}</td>
                <td>{application.product.product_name}</td>
                <td>
                  {application.documents.map(doc => (
                    <div key={doc.document_id}>
                      <img src={doc.document_url} alt={doc.document_type} style={{ width: '100px', height: '100px' }} />
                      <p>{doc.document_type}</p>
                      <a href={doc.document_url} target="_blank" rel="noopener noreferrer">View</a> |
                      <a href={doc.document_url} download>Download</a>
                      <div>
                        <input type="checkbox" id={`doc-reverify-ok-${doc.document_id}`} /> OK
                        <input type="checkbox" id={`doc-reverify-not-ok-${doc.document_id}`} /> Not OK
                      </div>
                    </div>
                  ))}
                </td>
                <td>
                  <textarea id={`review-reverify-${application.application_id}`} placeholder="Enter review comments"></textarea>
                </td>
                <td>
                  <button onClick={() => handleReverificationResubmitDocs(application)}>Resubmit Docs</button>
                  <button onClick={() => handleReverificationApproveLoan(application)}>Approve Loan</button>
                  <button onClick={() => handleReverificationRejectApplication(application.application_id)}>Reject Application</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;



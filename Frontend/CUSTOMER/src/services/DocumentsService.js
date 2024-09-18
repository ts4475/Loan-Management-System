

// import axios from 'axios';

// const API_URL = 'http://localhost:8083/documents';

// class DocumentsService {
//     uploadDocument(formData) {
//         return axios.post(`${API_URL}/upload`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//     }

//     getDocumentsByApplicationId(applicationId) {
//         return axios.get(`${API_URL}/byApplication/${applicationId}`);
//     }

//     deleteDocumentsByApplicationId(applicationId) {
//         return axios.delete(`${API_URL}/deleteByApplication/${applicationId}`);
//     }
// }

// export default new DocumentsService();

import axios from 'axios';

const API_URL = 'http://localhost:8083/documents';

class DocumentsService {
    uploadDocument(formData) {
        return axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    getDocumentsByApplicationId(applicationId) {
        return axios.get(`${API_URL}/byApplication/${applicationId}`);
    }

    updateDocument(documentId, document) {
        return axios.put(`${API_URL}/update/${documentId}`, document);
    }

    updateDocumentUrl(documentId, documentUrl) {
        return axios.put(`${API_URL}/updateUrl`, null, {
            params: {
                document_id: documentId,
                document_url: documentUrl
            }
        });
    }

    uploadDocuments(documentData) {
        return axios.post(`${API_URL}/add`, documentData);
    }

    deleteDocumentsByApplicationId(applicationId) {
        return axios.delete(`${API_URL}/deleteByApplication/${applicationId}`);
    }
}

export default new DocumentsService();

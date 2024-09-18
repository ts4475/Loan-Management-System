import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Navbar from './Navbar';
 
const RepaymentsPage = () => {
    const { loanId } = useParams();
    const [repayments, setRepayments] = useState([]);
 
    useEffect(() => {
        axios.get(`http://localhost:9191/api/repayments/loan/${loanId}`)
            .then(response => {
                setRepayments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the repayments!', error);
            });
    }, [loanId]);
 
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Repayments for Loan ID: ${loanId}`, 10, 10);
 
        const headers = ['Repayment ID', 'Amount', 'Repayment Date', 'Status'];
       
        const rows = repayments.map(item => [
            item.id,
            item.amount,
            item.repaymentDate,
            item.status
        ]);
 
        doc.autoTable({
            startY: 20,
            head: [headers],
            body: rows,
        });
 
        doc.save(`repayments_loan_${loanId}.pdf`);
    };
 
    return (
        <div className="bg-[#E7EEE1] min-h-screen">
            <Navbar/>
            <h2 className="text-2xl font-bold mb-4 text-[#5F7A61]">Repayments for Loan ID: {loanId}</h2>
            {repayments.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <button onClick={generatePDF} className="bg-[#5F7A61] text-white py-2 px-4 rounded mb-4">Download Repayments</button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-[#5F7A61] text-white">
                                <tr className="flex w-full">
                                    <th className="flex-1 px-4 py-2">Repayment ID</th>
                                    <th className="flex-1 px-4 py-2">Amount</th>
                                    <th className="flex-1 px-4 py-2">Repayment Date</th>
                                    <th className="flex-1 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {repayments.map(repayment => (
                                    <tr key={repayment.id} className="flex w-full border-b last:border-none hover:bg-gray-100">
                                        <td className="flex-1 px-4 py-2">{repayment.id}</td>
                                        <td className="flex-1 px-4 py-2">{repayment.amount}</td>
                                        <td className="flex-1 px-4 py-2">{repayment.repaymentDate}</td>
                                        <td className="flex-1 px-4 py-2">{repayment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">No Repayments Available</p>
            )}
        </div>
    );
};
 
export default RepaymentsPage;
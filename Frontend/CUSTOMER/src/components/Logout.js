// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    }, [navigate]);

    return (
        <div>
            <h2>Logged out successfully, redirecting you back to the login page in 3 seconds</h2>
        </div>
    );
};

export default Logout;

// src/pages/Logout.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove token from local storage
        localStorage.removeItem('authToken');

        // Redirect to home page
        navigate('/');
    }, [navigate]);

    return (
        <div>Logging out...</div>
    );
};

export default Logout;

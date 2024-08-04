// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Importing CSS for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/login', formData);
            const { token } = response.data; // Extract the token from the response
            localStorage.setItem('authToken', token); // Store token in local storage
            alert('Login successful');
            console.log('Token:', token);
            // Redirect or perform other actions upon successful login
            navigate('/profile')
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to log in');
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <center><a href='http://localhost:3000/signup'>SignUp</a></center>
                </form>
            </div>
        </div>
    );
};

export default Login;

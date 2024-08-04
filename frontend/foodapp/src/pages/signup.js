// src/pages/SignUp.js

import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Importing CSS for styling
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        height: '',
        weight: '',
        disease: '',
        activityFactor: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
   

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
            // Ensure activityFactor is converted to a number
            const dataToSubmit = {
                ...formData,
                activityFactor: Number(formData.activityFactor)
            };

            const response = await axios.post('/user/register', dataToSubmit);
            alert('User registered successfully');
            console.log(response.data);
            navigate('/login')

            // Clear form data after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                age: '',
                height: '',
                weight: '',
                disease: '',
                activityFactor: ''
            });

        } catch (error) {
            console.error('Error registering user:', error);
            setError('Failed to register user. Please check your input.');
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-form">
                    <h1>Sign Up</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
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
                        <div>
                            <label>Age:</label>
                            <input 
                                type="number" 
                                name="age" 
                                value={formData.age} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Height (cm):</label>
                            <input 
                                type="number" 
                                name="height" 
                                value={formData.height} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Weight (kg):</label>
                            <input 
                                type="number" 
                                name="weight" 
                                value={formData.weight} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Disease:</label>
                            <input 
                                type="text" 
                                name="disease" 
                                value={formData.disease} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Activity Factor:</label>
                            <input 
                                type="number" 
                                name="activityFactor" 
                                value={formData.activityFactor} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

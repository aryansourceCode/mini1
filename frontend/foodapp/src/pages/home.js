// src/pages/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="home">
            <h1>Welcome to the Meal Planner</h1>
            <p>Plan your meals according to your nutritional needs.</p>
            <div className="image-container">
                <img src="https://media.istockphoto.com/id/1332083244/vector/man-eat-the-salad-for-good-health.jpg?s=612x612&w=0&k=20&c=6Msp2hS0S1CVd9m19TZa6FgqWkBZpdczGHmHj_d4jvc=" alt="Corner Image" /> {/* Replace with your image path */}
            </div>
            <div className="features">
                <h2>Features</h2>
                <ul>
                    <li>Customizable meal plans</li>
                    <li>Detailed nutritional information</li>
                    <li>Easy to use interface</li>
                    <li>Download meal plans as PDF</li>
                    <li>Track your dietary goals</li>
                </ul>
            </div>
            <div className="cta">
                <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
            </div>
        </div>
    );
};

export default Home;

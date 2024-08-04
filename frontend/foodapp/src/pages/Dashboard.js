import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [diseaseData, setDiseaseData] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                setDiseaseData(response.data.disease[0]); // Assuming there's only one disease object
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('authToken');
        // Redirect to login page
        navigate('/logout');
    };

    const handleGenerateMeal = () => {
        // Redirect to generate meal page
        navigate('/meal');
    };

    if (!user || !diseaseData) return <div>Loading...</div>;

    // Data for charts
    const diseaseLabels = [
        'Carbs', 'Total Fat', 'Saturated Fat', 'Protein', 'Fiber',
        'Cholesterol', 'Sodium', 'Sugar', 'Potassium', 'Magnesium',
        'Phosphorus', 'Vitamin C', 'Vitamin A', 'Calcium', 'Iron',
        'Zinc', 'Vitamin E', 'Vitamin K'
    ];

    const diseaseValues = [
        diseaseData.Carbs, diseaseData['Total Fat'], diseaseData['Saturated Fat'], diseaseData.Protein,
        diseaseData.Fiber, diseaseData.Cholesterol, diseaseData.Sodium, diseaseData.Sugar,
        diseaseData.Potassium, diseaseData.Magnesium, diseaseData.Phosphorus, diseaseData['Vitamin C'],
        diseaseData['Vitamin A'], diseaseData.Calcium, diseaseData.Iron, diseaseData.Zinc,
        diseaseData['Vitamin E'], diseaseData['Vitamin K']
    ];

    const chartData = {
        labels: diseaseLabels,
        datasets: [
            {
                label: 'Nutritional Values',
                data: diseaseValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="dashboard">
            <h1>User Dashboard</h1>
            <div className="user-info">
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Height:</strong> {user.height} cm</p>
                <p><strong>Weight:</strong> {user.weight} kg</p>
                <p><strong>Disease:</strong> {user.disease}</p>
                <p><strong>Activity Factor:</strong> {user.activityFactor}</p>
                <p><strong>BMI:</strong> {user.bmi.toFixed(2)}</p>
            </div>
            <div className="charts">
                <h2>Your Nutritional Requirements</h2>
                <div className="chart-container">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            return `${context.label}: ${context.raw}`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleGenerateMeal}>Generate Meal</button>
            </div>
        </div>
    );
};

export default Dashboard;

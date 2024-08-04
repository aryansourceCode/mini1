// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import MealCard from '../components/mealcard';
import 'jspdf-autotable';
import './meal.css'; // Import CSS for styling

const Dashboard = () => {
    const [mealPlan, setMealPlan] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('/meal/mealplan', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setMealPlan(response.data.mealPlan);
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            }
        };

        fetchData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        let yOffset = 20;

        doc.setFontSize(20);
        doc.text('Meal Plan', 20, yOffset);

        yOffset += 10;

        Object.keys(mealPlan).forEach((mealType, index) => {
            if (index > 0) {
                yOffset += 10; // Add space between meal types
            }
            
            doc.setFontSize(16);
            doc.text(mealType.charAt(0).toUpperCase() + mealType.slice(1), 20, yOffset);

            yOffset += 10;

            const foodItems = mealPlan[mealType].map(item => [
                item["food items"],
                item.Carbs,
                item["Total Fat"],
                item.Protein,
                item.Fiber,

                item["Vitamin E"],
                item["Vitamin K"]
            ]);

            doc.autoTable({
                startY: yOffset,
                head: [['Food Item', 'Carbs', 'Total Fat', 'Protein', 'Fiber', 'Vitamin E', 'Vitamin K']],
                body: foodItems,
                theme: 'striped'
            });

            yOffset = doc.autoTable.previous.finalY + 10;
        });

        doc.save('meal_plan.pdf');
    };

    
    if (!mealPlan) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <h1>Meal Plan</h1>
            <button onClick={generatePDF}>Download PDF</button>
            <div className="meal-cards">
                {Object.keys(mealPlan).map(mealType => (
                    <MealCard key={mealType} mealType={mealType} foodItems={mealPlan[mealType]} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

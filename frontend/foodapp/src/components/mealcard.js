// src/components/MealCard.js

import React from 'react';

const MealCard = ({ mealType, foodItems }) => {
    return (
        <div className="meal-card">
            <h2>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
            <ul>
                {foodItems.map(item => (
                    <li key={item._id}>
                        {item["food items"]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealCard;

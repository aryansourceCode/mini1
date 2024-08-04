const express = require('express');
const FoodItem = require('../models/final_food'); // Import the FoodItem model
const Disease = require('../models/Disease'); // Import the Disease model
const User = require('../models/User'); // Import the User model
const{jwtauthmiddleware,generatetoken}=require('../jwt')
const router = express.Router();

// Fisher-Yates shuffle algorithm to randomize array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Route to fetch meals based on nutrient requirements
router.get('/mealplan',jwtauthmiddleware, async (req, res) => {
    const userId  = req.user.id;
    console.log(userId.id);

    try {
        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch the disease-specific nutrient requirements
        const diseaseRequirements = await Disease.findOne({ Disease: user.disease });
        if (!diseaseRequirements) {
            return res.status(404).json({ error: 'Disease not found' });
        }

        // Calculate daily calorie requirement
        const dailyCalories = user.calculateCalorieRequirement();

        // Query the FoodItem model based on nutrient requirements
        const foods = await FoodItem.find({
            Carbs: { $lte: diseaseRequirements.Carbs },
            Total_Fat: { $lte: diseaseRequirements.Total_Fat },
            Saturated_Fat: { $lte: diseaseRequirements.Saturated_Fat },
            Protein: { $lte: diseaseRequirements.Protein },
            Fiber: { $lte: diseaseRequirements.Fiber },
            Cholesterol: { $lte: diseaseRequirements.Cholesterol },
            Sodium: { $lte: diseaseRequirements.Sodium },
            Sugar: { $lte: diseaseRequirements.Sugar },
            Potassium: { $lte: diseaseRequirements.Potassium },
            Magnesium: { $lte: diseaseRequirements.Magnesium },
            Phosphorus: { $lte: diseaseRequirements.Phosphorus },
            Vitamin_C: { $lte: diseaseRequirements.Vitamin_C },
            Vitamin_A: { $lte: diseaseRequirements.Vitamin_A },
            Calcium: { $lte: diseaseRequirements.Calcium },
            Iron: { $lte: diseaseRequirements.Iron },
            Zinc: { $lte: diseaseRequirements.Zinc },
            Vitamin_E: { $lte: diseaseRequirements.Vitamin_E },
            Vitamin_K: { $lte: diseaseRequirements.Vitamin_K }
        });

        if (foods.length === 0) {
            return res.status(404).json({ message: 'No food items found matching the criteria' });
        }

        // Shuffle the foods array to randomize the selection
        const shuffledFoods = shuffleArray(foods);

        // Generate meal plan with random foods
        const mealPlan = {
            breakfast: shuffledFoods.slice(0, 3),
            lunch: shuffledFoods.slice(3, 6),
            dinner: shuffledFoods.slice(6, 9)
        };

        res.status(200).json({ mealPlan });
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
});

module.exports = router;

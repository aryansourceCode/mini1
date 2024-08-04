// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Disease=require('../models/Disease')
const User = require('../models/User');
const{jwtauthmiddleware,generatetoken}=require('../jwt')

// Register route (existing code)
router.post('/register', async (req, res) => {
    const { name, email, password, age, height, weight, disease, activityFactor } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Validate input fields
        if (!name || !email || !password || !age || !height || !weight || !disease || typeof activityFactor !== 'number') {
            return res.status(400).json({ error: 'All fields are required and activityFactor must be a number' });
        }

        if (typeof activityFactor !== 'number' || activityFactor <= 0) {
            return res.status(400).json({ error: 'Invalid activity factor' });
        }

        // Validate height, weight, and age (e.g., ensure they are positive numbers)
        if (height <= 0 || weight <= 0 || age <= 0) {
            return res.status(400).json({ error: 'Height, weight, and age must be positive numbers' });
        }

        // Create a new user
        const user = new User({
            name,
            email,
            password,
            age,
            height,
            weight,
            disease,
            activityFactor
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const payload={
            id:user.id
        }
        
        const token=generatetoken(payload);
        console.log(token);
      
        res.json({token});

        //res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
});
router.get('/profile',jwtauthmiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log('user data',userData);
        const userId = userData.id;
        const user = await User.findById(userId);
        const disease=await Disease.find({"Disease":user.disease})
        

        
        // Respond with the user profile data
        res.status(200).json({user,disease});

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }

})
module.exports = router;

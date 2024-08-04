const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    activityFactor: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        default: 0 // Initialize with a default value
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    // Calculate BMI and update the field before saving
    if (this.isModified('height') || this.isModified('weight')) {
        this.bmi = this.calculateBMI();
    }

    next();
});

// Calculate BMI
userSchema.methods.calculateBMI = function () {
    // Height in meters and weight in kilograms
    const heightInMeters = this.height / 100;
    return this.weight / (heightInMeters * heightInMeters);
};

// Calculate daily calorie requirement
userSchema.methods.calculateCalorieRequirement = function () {
    // Using the Harris-Benedict equation for calculation
    const heightInCm = this.height;
    const weightInKg = this.weight;
    const ageInYears = this.age;

    // Harris-Benedict equation for men and women
    // Adjust the equation according to user gender if applicable

    // For simplicity, assuming male:
    const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5; // BMR for men

    // Use the activity factor provided by the user
    return bmr * this.activityFactor;
};

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;

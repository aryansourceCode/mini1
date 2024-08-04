const mongoose = require('mongoose');

const calorie = new mongoose.Schema({
  food_items: { type: String, required: true },
  Avg_Serving_Size: { type: Number, required: true },
  Calories: { type: Number, required: true },
  Category: { type: String, required: true },
});

const calories = mongoose.model('calories', calorie);

module.exports = calories;

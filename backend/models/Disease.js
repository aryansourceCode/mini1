const mongoose = require('mongoose');

const disease = new mongoose.Schema({
  Disease: { type: String, required: true },
  Carbs: { type: Number, required: true },
  Total_Fat: { type: Number, required: true },
  Saturated_Fat: { type: Number, required: true },
  Protein: { type: Number, required: true },
  Fiber: { type: Number, required: true },
  Cholesterol: { type: Number, required: true },
  Sodium: { type: Number, required: true },
  Sugar: { type: Number, required: true },
  Potassium: { type: Number, required: true },
  Magnesium: { type: Number, required: true },
  Phosphorus: { type: Number, required: true },
  Vitamin_C: { type: Number, required: true },
  Vitamin_A: { type: Number, required: true },
  Calcium: { type: Number, required: true },
  Iron: { type: Number, required: true },
  Zinc: { type: Number, required: true },
  Vitamin_E: { type: Number, required: true },
  Vitamin_K: { type: Number, required: true },
});

const Disease = mongoose.model('Disease', disease);

module.exports = Disease;

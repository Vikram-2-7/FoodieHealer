const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fitnessData: {
    age: Number,
    weight: Number,
    height: Number,
    activityLevel: String,
    goal: String,
    preferences: [String],
  },
});

module.exports = mongoose.model('User', userSchema);
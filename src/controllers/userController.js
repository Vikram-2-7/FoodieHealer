const User = require('../models/User');

exports.updateFitnessData = async (req, res) => {
  try {
    const { age, weight, height, activityLevel, goal, preferences } = req.body;
    const userId = req.user.id;

    // Update user's fitness data
    await User.findByIdAndUpdate(userId, {
      fitnessData: { age, weight, height, activityLevel, goal, preferences },
    });

    res.status(200).json({ message: 'Fitness data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
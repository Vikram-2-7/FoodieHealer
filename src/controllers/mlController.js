const axios = require('axios');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Call ML API
    const response = await axios.post('http://localhost:5001/predict', user.fitnessData);

    res.status(200).json({ recommendations: response.data.recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
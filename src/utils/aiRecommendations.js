// src/utils/aiRecommendations.js
import axios from 'axios';

export const getPersonalizedRecommendations = async (userData) => {
  try {
    const response = await axios.post('https://your-ml-model-endpoint.com/predict', userData);
    return response.data.recommendations; // Example: { dietPlan: [...], workoutPlan: [...] }
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    return null;
  }
};
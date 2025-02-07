import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update if your backend is hosted elsewhere

export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password,
        });
        return response.data.token;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};
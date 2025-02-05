import AsyncStorage from '@react-native-async-storage/async-storage';

// Save Username to AsyncStorage
export const saveUsername = async (username) => {
    try {
        await AsyncStorage.setItem('username', username);
    } catch (error) {
        console.error('Failed to save username:', error);
    }
};

// Retrieve Username from AsyncStorage
export const getUsername = async () => {
    try {
        const storedUsername = await AsyncStorage.getItem('username');
        return storedUsername || ''; // Return empty string if no username is found
    } catch (error) {
        console.error('Failed to retrieve username:', error);
        return '';
    }
};
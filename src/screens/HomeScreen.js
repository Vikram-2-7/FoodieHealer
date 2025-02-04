// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="Food Manager" />
            <Text style={styles.title}>Welcome to Food Manager!</Text>
            <Button title="Get Started" onPress={() => navigation.navigate('ExerciseRecommendations')} />
            <Button title="View Meal Suggestions" onPress={() => navigation.navigate('MealSuggestions')} />
            <Button title="Log a Meal" onPress={() => navigation.navigate('MealLog')} />
            <Button title="Community Challenges" onPress={() => navigation.navigate('Community')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
    },
});

export default HomeScreen;
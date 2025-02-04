// src/screens/DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DashboardScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>Food</Text>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('Food')}
                >
                    <Text style={styles.menuText}>View Meals</Text>
                    <Text style={styles.menuDescription}>Check your saved meals.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('AddMeal')}
                >
                    <Text style={styles.menuText}>Add Meal</Text>
                    <Text style={styles.menuDescription}>Log a new meal.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('MealSuggestions')}
                >
                    <Text style={styles.menuText}>Meal Suggestions</Text>
                    <Text style={styles.menuDescription}>Get personalized meal ideas.</Text>
                </TouchableOpacity>

                <Text style={styles.sectionHeader}>Fitness</Text>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('TrackWorkout')}
                >
                    <Text style={styles.menuText}>Track Workout</Text>
                    <Text style={styles.menuDescription}>Log your workouts.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('ViewExercises')}
                >
                    <Text style={styles.menuText}>View Exercises</Text>
                    <Text style={styles.menuDescription}>Browse exercises.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('FitnessGoals')}
                >
                    <Text style={styles.menuText}>Fitness Goals</Text>
                    <Text style={styles.menuDescription}>Set and track your fitness goals.</Text>
                </TouchableOpacity>

                <Text style={styles.sectionHeader}>Diet</Text>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('DietPlans')}
                >
                    <Text style={styles.menuText}>View Diet Plans</Text>
                    <Text style={styles.menuDescription}>Explore various diet plans.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('TrackCalories')}
                >
                    <Text style={styles.menuText}>Track Calories</Text>
                    <Text style={styles.menuDescription}>Monitor your daily calorie intake.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('NutritionTips')}
                >
                    <Text style={styles.menuText}>Nutrition Tips</Text>
                    <Text style={styles.menuDescription}>Get tips for healthy eating.</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#32CD32', // Fitness-related green theme
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    sectionContainer: {
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 10,
    },
    menuItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        elevation: 5,
    },
    menuText: {
        fontSize: 18,
        color: '#32CD32', // Match the theme color
    },
    menuDescription: {
        fontSize: 14,
        color: '#888',
    },
});

export default DashboardScreen;
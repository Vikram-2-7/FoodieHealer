// src/navigation/navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing Screens
import HomeScreen from '../screens/HomeScreen';
import ExerciseRecommendationsScreen from '../screens/ExerciseRecommendationsScreen';
import MealSuggestionsScreen from '../screens/MealSuggestionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen'; 
import RecipeDetailScreen from '../screens/RecipeDetailScreen'; 
import MealLogScreen from '../screens/MealLogScreen'; 
import CommunityScreen from '../screens/CommunityScreen'; 
import LoginScreen from '../screens/LoginScreen'; // Login Screen
import RegisterScreen from '../screens/RegisterScreen'; // Registration Screen
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; // Forgot Password Screen
import DashboardScreen from '../screens/DashboardScreen'; // Dashboard Screen
import FoodScreen from '../screens/FoodScreen'; // Food Section Screen
import AddMealScreen from '../screens/AddMealScreen'; // Add Meal Screen
import FitnessScreen from '../screens/FitnessScreen'; // Fitness Section Screen
import TrackWorkoutScreen from '../screens/TrackWorkoutScreen'; // Track Workout Screen
import ViewExercisesScreen from '../screens/ViewExercisesScreen'; // View Exercises Screen
import FitnessGoalsScreen from '../screens/FitnessGoalsScreen'; // Fitness Goals Screen
import DietScreen from '../screens/DietScreen'; // Diet Section Screen

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* Authentication Screens */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

                {/* Main App Screens */}
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                
                {/* Food Screens */}
                <Stack.Screen name="Food" component={FoodScreen} />
                <Stack.Screen name="AddMeal" component={AddMealScreen} />
                
                {/* Fitness Screens */}
                <Stack.Screen name="Fitness" component={FitnessScreen} />
                <Stack.Screen name="TrackWorkout" component={TrackWorkoutScreen} />
                <Stack.Screen name="ViewExercises" component={ViewExercisesScreen} />
                <Stack.Screen name="FitnessGoals" component={FitnessGoalsScreen} />

                {/* Diet Screens */}
                <Stack.Screen name="Diet" component={DietScreen} />
                

                {/* Other existing screens */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ExerciseRecommendations" component={ExerciseRecommendationsScreen} />
                <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Progress" component={ProgressScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
                <Stack.Screen name="MealLog" component={MealLogScreen} />
                <Stack.Screen name="Community" component={CommunityScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
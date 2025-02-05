import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
// Authentication Screens
import LoginScreen from '../screens/LoginScreen'; // Login Screen
import RegisterScreen from '../screens/RegisterScreen'; // Registration Screen
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; // Forgot Password Screen

// Main App Screens
import DashboardScreen from '../screens/DashboardScreen'; // Dashboard Screen
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommunityScreen from '../screens/CommunityScreen';

// Food Screens
import FoodScreen from '../screens/FoodScreen'; // Food Section Screen
import AddMealScreen from '../screens/AddMealScreen'; // Add Meal Screen
import MealLogScreen from '../screens/MealLogScreen'; // Meal Log Screen
import MealSuggestionsScreen from '../screens/MealSuggestionsScreen';

// Fitness Screens
import FitnessScreen from '../screens/FitnessScreen'; // Fitness Section Screen
import TrackWorkoutScreen from '../screens/TrackWorkoutScreen'; // Track Workout Screen
import ViewExercisesScreen from '../screens/ViewExercisesScreen'; // View Exercises Screen
import FitnessGoalsScreen from '../screens/FitnessGoalsScreen'; // Fitness Goals Screen
import ExerciseRecommendationsScreen from '../screens/ExerciseRecommendationsScreen';

// Diet Screens
import DietScreen from '../screens/DietScreen'; // Diet Section Screen
import RecipeDetailScreen from '../screens/RecipeDetailScreen'; // Recipe Detail Screen

// New Screens for Personalized Diet Planner and Cart
import PersonalizedDietPlannerScreen from '../screens/PersonalizedDietPlannerScreen';
import CartScreen from '../screens/CartScreen'; // Cart Screen

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />

        {/* Food Screens */}
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="AddMeal" component={AddMealScreen} />
        <Stack.Screen name="MealLog" component={MealLogScreen} />
        <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />

        {/* Fitness Screens */}
        <Stack.Screen name="Fitness" component={FitnessScreen} />
        <Stack.Screen name="TrackWorkout" component={TrackWorkoutScreen} />
        <Stack.Screen name="ViewExercises" component={ViewExercisesScreen} />
        <Stack.Screen name="FitnessGoals" component={FitnessGoalsScreen} />
        <Stack.Screen name="ExerciseRecommendations" component={ExerciseRecommendationsScreen} />

        {/* Diet Screens */}
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />

        {/* New Screens for Personalized Diet Planner */}
        <Stack.Screen name="PersonalizedDietPlanner" component={PersonalizedDietPlannerScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
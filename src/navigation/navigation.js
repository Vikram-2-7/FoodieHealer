// src/navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ExerciseRecommendationsScreen from '../screens/ExerciseRecommendationsScreen';
import MealSuggestionsScreen from '../screens/MealSuggestionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ExerciseRecommendations" component={ExerciseRecommendationsScreen} />
                <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Progress" component={ProgressScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

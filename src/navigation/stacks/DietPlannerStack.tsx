import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DietPlannerScreen from '../../screens/DietPlannerScreen';
import MealDetailsScreen from '../../screens/MealDetails';

const Stack = createNativeStackNavigator();

export default function DietPlannerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietPlanner" component={DietPlannerScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
    </Stack.Navigator>
  );
} 

// src/screens/MainApp.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from './DashboardScreen';
import PersonalizedDietPlannerScreen from './PersonalizedDietPlannerScreen';
import FitnessScreen from './FitnessScreen';
import CartScreen from './CartScreen';
import AccountScreen from './AccountScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Diet Planner') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Fitness') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.babyPink,
        tabBarInactiveTintColor: colors.darkPurple,
        tabBarStyle: {
          backgroundColor: colors.lightPurple,
          borderTopWidth: 0,
          height: 60,
        },
      })}
    >
      {/* Dashboard Screen */}
      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      {/* Diet Planner Screen */}
      <Tab.Screen name="Diet Planner" component={PersonalizedDietPlannerScreen} />

      {/* Fitness Screen */}
      <Tab.Screen name="Fitness" component={FitnessScreen} />

      {/* Cart Screen */}
      <Tab.Screen name="Cart" component={CartScreen} />

      {/* Account Screen */}
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default MainApp;
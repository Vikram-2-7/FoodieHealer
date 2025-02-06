// src/navigation/navigation.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PersonalizedDietPlannerScreen from '../screens/PersonalizedDietPlannerScreen';
import FitnessScreen from '../screens/FitnessScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator>
      {/* Login Screen */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      
      {/* Register Screen */}
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

// Main App Tab Navigator
const MainAppTabs = () => {
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
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={({ route }) => ({
          title: 'Home',
          headerShown: false,
        })} 
      />
      <Tab.Screen name="Diet Planner" component={PersonalizedDietPlannerScreen} />
      <Tab.Screen name="Fitness" component={FitnessScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// Root Navigator
const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Splash Screen */}
        {isLoading ? (
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
        ) : (
          // Authentication Flow
          <Stack.Screen 
            name="Auth" 
            component={AuthStack} 
            options={{ headerShown: false }} 
          />
        )}
        {/* Main App Tabs */}
        <Stack.Screen 
          name="MainApp" 
          component={MainAppTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
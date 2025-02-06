// src/navigation/navigation.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserInfoScreen from '../screens/UserInfoScreen'; // New screen for user info
import DashboardScreen from '../screens/DashboardScreen';
import PersonalizedDietPlannerScreen from '../screens/PersonalizedDietPlannerScreen';
import FitnessScreen from '../screens/FitnessScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Diet Planner" component={PersonalizedDietPlannerScreen} />
      <Tab.Screen name="Fitness" component={FitnessScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// Root Navigator
const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true); // Simulate splash screen loading
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false); // Replace with actual logic to check first-time users

  // Simulate initialization (e.g., checking AsyncStorage or backend API)
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Retrieve login status from AsyncStorage
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        const isFirstTime = await AsyncStorage.getItem('isFirstTimeUser');

        // Update state based on retrieved values
        setIsLoggedIn(loggedIn === 'true'); // Convert string to boolean
        setIsFirstTimeUser(isFirstTime !== 'false'); // Assume true unless explicitly set to false
      } catch (error) {
        console.error('Error retrieving user status:', error);
      } finally {
        setIsLoading(false); // End splash screen loading
      }
    };

    checkUserStatus();
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
        ) : isLoggedIn ? (
          isFirstTimeUser ? (
            // First-Time User Flow
            <Stack.Screen 
              name="UserInfo" 
              component={UserInfoScreen} 
              options={{ title: 'Complete Your Profile' }} 
            />
          ) : (
            // Main App Tabs
            <Stack.Screen 
              name="MainApp" 
              component={MainAppTabs} 
              options={{ headerShown: false }} 
            />
          )
        ) : (
          // Authentication Flow
          <Stack.Screen 
            name="Auth" 
            component={AuthStack} 
            options={{ headerShown: false }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
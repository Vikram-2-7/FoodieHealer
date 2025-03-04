import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DietPlannerScreen from '../screens/DietPlannerScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetails';
import MealDetailsScreen from '../screens/MealDetails';
import WorkoutSessionScreen from '../screens/WorkoutSession';
import AllWorkoutsScreen from '../screens/AllWorkouts';
import AllMealsScreen from '../screens/AllMeals';
import ActivityHistoryScreen from '../screens/ActivityHistory';
import NutritionGoalsScreen from '../screens/NutritionGoalsScreen';
import MealSuggestionsScreen from '../screens/MealSuggestionsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SearchScreen from '../screens/SearchScreen';
import FoodCategoryScreen from '../screens/FoodCategoryScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';
import TimeMealsScreen from '../screens/TimeMealsScreen';
import MealTimeFoodsScreen from '../screens/MealTimeFoodsScreen';
import WorkoutPlanScreen from '../screens/WorkoutPlanScreen';
import { COLORS } from '../styles/theme';
import { RootStackParamList } from '../types/navigation';
import { IconNames } from '../types/navigation';

type TabParamList = {
  DashboardTab: undefined;
  DietPlannerTab: undefined;
  WorkoutTab: undefined;
  CartTab: undefined;
  SettingsTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Main stack that includes authentication and tab navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

// Main tab navigator that includes all screens
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconNames = 'circle';
          
          switch (route.name) {
            case 'DashboardTab':
              iconName = 'view-dashboard';
              break;
            case 'DietPlannerTab':
              iconName = 'food-apple';
              break;
            case 'WorkoutTab':
              iconName = 'dumbbell';
              break;
            case 'CartTab':
              iconName = 'cart';
              break;
            case 'SettingsTab':
              iconName = 'cog';
              break;
          }
          
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="DietPlannerTab" 
        component={DietPlannerStackNavigator}
        options={{ title: 'Diet' }}
      />
      <Tab.Screen 
        name="WorkoutTab" 
        component={WorkoutStackNavigator}
        options={{ title: 'Workout' }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartStackNavigator}
        options={{ title: 'Cart' }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsStackNavigator}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

// Stack navigators for each tab that include their respective screens
const DashboardStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="FoodCategory" component={FoodCategoryScreen} />
    <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
    <Stack.Screen 
      name="MealDetails" 
      component={MealDetailsScreen}
      options={({ route }) => ({
        headerShown: true
      })}
    />
    <Stack.Screen 
      name="WorkoutSession" 
      component={WorkoutSessionScreen}
    />
    <Stack.Screen name="AllWorkouts" component={AllWorkoutsScreen} />
    <Stack.Screen name="AllMeals" component={AllMealsScreen} />
    <Stack.Screen name="ActivityHistory" component={ActivityHistoryScreen} />
    <Stack.Screen name="NutritionGoals" component={NutritionGoalsScreen} />
    <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />
    <Stack.Screen 
      name="TimeMeals" 
      component={TimeMealsScreen}
    />
    <Stack.Screen 
      name="MealTimeFoods" 
      component={MealTimeFoodsScreen}
    />
  </Stack.Navigator>
);

const DietPlannerStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DietPlanner" component={DietPlannerScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="FoodCategory" component={FoodCategoryScreen} />
    <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
    <Stack.Screen name="NutritionGoals" component={NutritionGoalsScreen} />
    <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />
  </Stack.Navigator>
);

const WorkoutStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WorkoutMain" component={WorkoutScreen} />
    <Stack.Screen name="WorkoutPlan" component={WorkoutPlanScreen} />
    <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
    <Stack.Screen 
      name="WorkoutSession" 
      component={WorkoutSessionScreen}
    />
  </Stack.Navigator>
);

const CartStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

const SettingsStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default AppNavigator; 
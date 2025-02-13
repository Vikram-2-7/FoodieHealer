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
import { COLORS } from '../styles/theme';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDetails: undefined;
  MainApp: undefined;
  Profile: undefined;
  WorkoutDetails: { workout: WorkoutPlan };
  MealDetails: { meal: DietPlan };
  WorkoutSession: { workout?: WorkoutPlan; activity?: any };
  AllWorkouts: undefined;
  AllMeals: undefined;
  ActivityHistory: undefined;
  NutritionGoals: undefined;
  MealSuggestions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      <Stack.Screen 
        name="MainApp" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
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
              iconName = 'account-settings';
              break;
            default:
              iconName = 'help';
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
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.white,
        tabBarHideOnKeyboard: false,
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{ 
          title: 'Dashboard',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DietPlannerTab"
        component={DietPlannerStack}
        options={{ 
          title: 'Diet Planner',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WorkoutTab"
        component={WorkoutStack}
        options={{ 
          title: 'Workout',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{ 
          title: 'Cart',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ 
          title: 'Settings',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// Stack navigators for each tab
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
      <Stack.Screen name="AllWorkouts" component={AllWorkoutsScreen} />
      <Stack.Screen name="AllMeals" component={AllMealsScreen} />
      <Stack.Screen name="ActivityHistory" component={ActivityHistoryScreen} />
      <Stack.Screen name="NutritionGoals" component={NutritionGoalsScreen} />
      <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />
    </Stack.Navigator>
  );
}

function DietPlannerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietPlanner" component={DietPlannerScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      <Stack.Screen name="NutritionGoals" component={NutritionGoalsScreen} />
      <Stack.Screen name="MealSuggestions" component={MealSuggestionsScreen} />
    </Stack.Navigator>
  );
}

function WorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator; 
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';
import DashboardStack from './stacks/DashboardStack';
import DietPlannerStack from './stacks/DietPlannerStack';
import WorkoutStack from './stacks/WorkoutStack';
import CartStack from './stacks/CartStack';
import SettingsStack from './stacks/SettingsStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.white,
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
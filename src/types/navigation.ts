import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WorkoutPlan {
  id: string;
  title: string;
  duration: string;
  image: any;
  progress: number;
}

interface DietPlan {
  id: string;
  title: string;
  calories: number;
  image: any;
  time: string;
}

// Add this type for the icon names
export type IconNames = keyof typeof MaterialCommunityIcons.glyphMap;

export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;
  UserDetails: undefined;
  MainApp: undefined;

  // Main Stack
  Dashboard: undefined;
  DietPlanner: undefined;
  WorkoutMain: undefined;
  Workout: undefined;
  Cart: undefined;
  Settings: undefined;
  Profile: undefined;
  Search: undefined;
  FoodCategory: { category: string };
  Checkout: undefined;
  
  // Feature Screens
  WorkoutDetails: { workout: WorkoutPlan };
  MealDetails: { meal: DietPlan };
  WorkoutSession: {
    workout?: WorkoutPlan;
    activity?: any;
  };
  AllWorkouts: undefined;
  AllMeals: undefined;
  ActivityHistory: undefined;
  NutritionGoals: undefined;
  MealSuggestions: undefined;
  FoodDetails: { foodId: string };
  TimeMeals: { 
    mealTime: 'BREAKFAST' | 'LUNCH' | 'DINNER' 
  };
  MealTimeFoods: {
    mealTime: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  };
  WorkoutPlan: {
    title: string;
    progress: number;
    currentDay: number;
    totalDays: number;
    weekProgress?: {
      week: number;
      completed: number;
      total: number;
    }[];
  };
};

// Screen Props Types
export type WorkoutSessionScreenProps = NativeStackScreenProps<RootStackParamList, 'WorkoutSession'>;
export type TimeMealsScreenProps = NativeStackScreenProps<RootStackParamList, 'TimeMeals'>;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
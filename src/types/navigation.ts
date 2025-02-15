import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserDetails: undefined;
  MainApp: undefined;
  Dashboard: undefined;
  DietPlanner: undefined;
  Workout: undefined;
  Cart: undefined;
  Settings: undefined;
  Profile: undefined;
  WorkoutDetails: { workout: WorkoutPlan };
  MealDetails: { meal: DietPlan };
  WorkoutSession: { workout?: WorkoutPlan; activity?: any };
  AllWorkouts: undefined;
  AllMeals: undefined;
  ActivityHistory: undefined;
  NutritionGoals: undefined;
  MealSuggestions: undefined;
  FoodDetails: { foodId: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
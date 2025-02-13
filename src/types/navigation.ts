import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
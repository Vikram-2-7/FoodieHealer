import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const { width } = Dimensions.get('window');

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

interface NutritionGoal {
  id: string;
  nutrient: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
}

interface MealSuggestion {
  id: string;
  title: string;
  image: any;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  tags: string[];
}

const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
  const [recentActivities] = useState([
    {
      id: '1',
      title: 'Massive Upper Body',
      type: 'CLASSIC PLAN',
      day: 'Day 3',
      date: 'Aug 12',
      progress: 0.18,
    },
    {
      id: '2',
      title: 'Abs Beginner',
      type: '4th Time',
      day: 'Day 1',
      date: 'Aug 11',
      progress: 0.4,
    },
  ]);

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    {
      id: '1',
      title: 'Upper Body Workout',
      duration: '45 mins',
      image: require('../assets/images/upper-body.jpg'),
      progress: 0.6,
    },
    {
      id: '2',
      title: 'Core Strength',
      duration: '30 mins',
      image: require('../assets/images/core.jpg'),
      progress: 0.3,
    },
  ]);

  const [dietPlans, setDietPlans] = useState<DietPlan[]>([
    {
      id: '1',
      title: 'Breakfast',
      calories: 450,
      image: require('../assets/images/breakfast.jpg'),
      time: '8:00 AM',
    },
    {
      id: '2',
      title: 'Lunch',
      calories: 650,
      image: require('../assets/images/lunch.jpg'),
      time: '1:00 PM',
    },
  ]);

  const [nutritionGoals] = useState<NutritionGoal[]>([
    {
      id: '1',
      nutrient: 'Protein',
      current: 45,
      target: 120,
      unit: 'g',
      icon: 'food-steak',
    },
    {
      id: '2',
      nutrient: 'Carbs',
      current: 180,
      target: 250,
      unit: 'g',
      icon: 'bread-slice',
    },
    {
      id: '3',
      nutrient: 'Fat',
      current: 35,
      target: 65,
      unit: 'g',
      icon: 'food',
    },
  ]);

  const [mealSuggestions] = useState<MealSuggestion[]>([
    {
      id: '1',
      title: 'Greek Yogurt Bowl',
      image: require('../assets/images/meals/breakfast.jpg'),
      calories: 320,
      protein: 22,
      carbs: 45,
      fat: 8,
      time: 'Breakfast',
      tags: ['High Protein', 'Low Fat'],
    },
    // Add more meal suggestions
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderDifficultySelector = () => (
    <View style={styles.difficultyContainer}>
      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            styles.difficultyButton,
            selectedDifficulty === level && styles.selectedDifficulty
          ]}
          onPress={() => setSelectedDifficulty(level)}
        >
          <Text style={[
            styles.difficultyText,
            selectedDifficulty === level && styles.selectedDifficultyText
          ]}>
            {level}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Will implement search functionality
  };

  const handleSeeAllWorkouts = () => {
    navigation.navigate('AllWorkouts');
  };

  const handleSeeAllMeals = () => {
    navigation.navigate('AllMeals');
  };

  const handleWorkoutPress = (workout: WorkoutPlan) => {
    navigation.navigate('WorkoutDetails', { workout });
  };

  const handleMealPress = (meal: DietPlan) => {
    navigation.navigate('MealDetails', { meal });
  };

  const handleContinueActivity = (activity: any) => {
    navigation.navigate('WorkoutSession', { activity });
  };

  const handleSeeAllActivities = () => {
    navigation.navigate('ActivityHistory');
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section */}
      <LinearGradient
        colors={GRADIENTS.primary as [string, string]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome Back!</Text>
            <Text style={styles.date}>{new Date().toDateString()}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <MaterialCommunityIcons name="account" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts, plans..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="fire" size={24} color={COLORS.secondary} />
          <Text style={styles.statValue}>850</Text>
          <Text style={styles.statLabel}>Calories Burned</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="clock" size={24} color={COLORS.secondary} />
          <Text style={styles.statValue}>45m</Text>
          <Text style={styles.statLabel}>Workout Time</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="trophy" size={24} color={COLORS.secondary} />
          <Text style={styles.statValue}>80%</Text>
          <Text style={styles.statLabel}>Goal Completed</Text>
        </View>
      </View>

      {/* Nutrition Goals Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nutrition Goals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NutritionGoals')}>
            <Text style={styles.seeAll}>Adjust Goals</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {nutritionGoals.map(goal => (
            <View key={goal.id} style={styles.nutritionCard}>
              <MaterialCommunityIcons 
                name={goal.icon as any} 
                size={24} 
                color={COLORS.primary} 
              />
              <Text style={styles.nutritionTitle}>{goal.nutrient}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progress, 
                    { width: `${(goal.current / goal.target) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.nutritionText}>
                {goal.current}/{goal.target}{goal.unit}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Meal Suggestions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggested for You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MealSuggestions')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mealSuggestions.map(meal => (
            <TouchableOpacity 
              key={meal.id} 
              style={styles.mealSuggestionCard}
              onPress={() => navigation.navigate('MealDetails', { meal })}
            >
              <Image source={meal.image} style={styles.mealSuggestionImage} />
              <View style={styles.mealSuggestionContent}>
                <View style={styles.mealTags}>
                  {meal.tags.map(tag => (
                    <View key={tag} style={styles.tagContainer}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.mealSuggestionTitle}>{meal.title}</Text>
                <View style={styles.macroRow}>
                  <Text style={styles.macroText}>{meal.calories} cal</Text>
                  <Text style={styles.macroText}>P: {meal.protein}g</Text>
                  <Text style={styles.macroText}>C: {meal.carbs}g</Text>
                  <Text style={styles.macroText}>F: {meal.fat}g</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activity Section - New */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={handleSeeAllActivities}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentActivities.map(activity => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <Text style={styles.activityType}>{activity.type}</Text>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDate}>
                {activity.day} • {activity.date}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${activity.progress * 100}%` }]} />
              </View>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => handleContinueActivity(activity)}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Difficulty Selector - New */}
      {renderDifficultySelector()}

      {/* Workout Plans Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workout Plans</Text>
          <TouchableOpacity onPress={handleSeeAllWorkouts}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {workoutPlans.map(plan => (
            <TouchableOpacity 
              key={plan.id} 
              style={styles.workoutCard}
              onPress={() => handleWorkoutPress(plan)}
            >
              <Image
                source={plan.image}
                style={styles.workoutImage}
              />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{plan.title}</Text>
                <Text style={styles.workoutDuration}>{plan.duration}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progress, { width: `${plan.progress * 100}%` }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Diet Plans Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity onPress={handleSeeAllMeals}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {dietPlans.map(meal => (
          <TouchableOpacity 
            key={meal.id} 
            style={styles.mealCard}
            onPress={() => handleMealPress(meal)}
          >
            <Image
              source={meal.image}
              style={styles.mealImage}
            />
            <View style={styles.mealInfo}>
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <Text style={styles.mealTime}>{meal.time}</Text>
              <Text style={styles.mealCalories}>{meal.calories} calories</Text>
            </View>
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={24} 
              color={COLORS.textSecondary} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  date: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    marginTop: 20,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    marginLeft: 10,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: width / 3.5,
    ...SHADOWS.light,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  seeAll: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  workoutCard: {
    width: width * 0.7,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  workoutImage: {
    width: '100%',
    height: 150,
  },
  workoutInfo: {
    padding: 15,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  workoutDuration: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    ...SHADOWS.light,
  },
  mealImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  mealInfo: {
    flex: 1,
    marginLeft: 15,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  mealTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  mealCalories: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 2,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  difficultyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedDifficulty: {
    backgroundColor: COLORS.primary,
  },
  difficultyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  selectedDifficultyText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  activityCard: {
    width: width * 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    ...SHADOWS.light,
  },
  activityType: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  activityDate: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutritionCard: {
    width: width * 0.35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 10,
  },
  nutritionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  mealSuggestionCard: {
    width: width * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  mealSuggestionImage: {
    width: '100%',
    height: 150,
  },
  mealSuggestionContent: {
    padding: 15,
  },
  mealTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: COLORS.primary + '40',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  mealSuggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});

export default DashboardScreen;
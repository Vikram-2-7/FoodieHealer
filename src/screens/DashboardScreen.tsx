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
import { BlurContainer } from '../components/BlurContainer';
import { foodService } from '../services/foodService';

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

  const [dailyMeals, setDailyMeals] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // User's daily requirements (this could come from user profile/settings)
  const dailyRequirements = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  };

  const [suggestedMeals] = useState([
    {
      id: '1',
      title: 'Breakfast',
      time: '8:00 AM',
      suggestions: [
        {
          id: 'b1',
          name: 'Oatmeal with Fruits',
          calories: 350,
          image: require('../assets/images/breakfast.jpg'),
          description: 'Healthy start with oats, berries, and honey'
        }
      ]
    },
    {
      id: '2',
      title: 'Lunch',
      time: '1:00 PM',
      suggestions: [
        {
          id: 'l1',
          name: 'Grilled Chicken Salad',
          calories: 450,
          image: require('../assets/images/lunch.jpg'),
          description: 'Fresh greens with lean protein'
        }
      ]
    },
    {
      id: '3',
      title: 'Dinner',
      time: '7:00 PM',
      suggestions: [
        {
          id: 'd1',
          name: 'Salmon with Vegetables',
          calories: 550,
          image: require('../assets/images/dinner.jpg'),
          description: 'Omega-rich salmon with steamed veggies'
        }
      ]
    }
  ]);

  useCallback(() => {
    loadDailyMealSuggestions();
  }, []);

  const loadDailyMealSuggestions = async () => {
    try {
      setLoading(true);
      // Get suggested meals for each category
      const breakfast = await foodService.getFoodItems({ category: 'BREAKFAST', limit: 1 });
      const lunch = await foodService.getFoodItems({ category: 'LUNCH', limit: 1 });
      const dinner = await foodService.getFoodItems({ category: 'DINNER', limit: 1 });
      const snacks = await foodService.getFoodItems({ category: 'SNACKS', limit: 2 });

      setDailyMeals({
        breakfast: breakfast.items[0],
        lunch: lunch.items[0],
        dinner: dinner.items[0],
        snacks: snacks.items
      });
    } catch (error) {
      console.error('Error loading meal suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!dailyMeals.breakfast) return 0;
    
    const totalCalories = 
      (dailyMeals.breakfast?.calories || 0) +
      (dailyMeals.lunch?.calories || 0) +
      (dailyMeals.dinner?.calories || 0) +
      (dailyMeals.snacks?.reduce((acc: number, snack: any) => acc + (snack.calories || 0), 0) || 0);

    return Math.min((totalCalories / dailyRequirements.calories) * 100, 100);
  };

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

      {/* Daily Meal Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested Meals for Today</Text>
        {suggestedMeals.map((mealTime) => (
          <BlurContainer key={mealTime.id} style={styles.mealCard}>
            <View style={styles.mealTimeHeader}>
              <Text style={styles.mealTimeTitle}>{mealTime.title}</Text>
              <Text style={styles.mealTime}>{mealTime.time}</Text>
            </View>
            {mealTime.suggestions.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                style={styles.suggestionCard}
                onPress={() => navigation.navigate('FoodDetails' as const, { foodId: meal.id })}
              >
                <Image source={meal.image} style={styles.mealImage} />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealCalories}>{meal.calories} calories</Text>
                  <Text style={styles.mealDescription}>{meal.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </BlurContainer>
        ))}
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

      {/* Daily Progress Section */}
      <BlurContainer style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Daily Progress</Text>
        <View style={styles.nutritionGrid}>
          <NutritionCard
            title="Calories"
            current={calculateProgress()}
            target={dailyRequirements.calories}
            unit="kcal"
            icon="fire"
          />
          <NutritionCard
            title="Protein"
            current={75}
            target={dailyRequirements.protein}
            unit="g"
            icon="egg"
          />
          <NutritionCard
            title="Carbs"
            current={120}
            target={dailyRequirements.carbs}
            unit="g"
            icon="bread-slice"
          />
          <NutritionCard
            title="Fat"
            current={30}
            target={dailyRequirements.fat}
            unit="g"
            icon="oil"
          />
        </View>
      </BlurContainer>

      {/* Daily Meal Plan Section */}
      <BlurContainer style={styles.mealPlanSection}>
        <Text style={styles.sectionTitle}>Today's Meal Plan</Text>
        
        <MealCard
          title="Breakfast"
          meal={dailyMeals.breakfast}
          time="7:00 - 9:00 AM"
          icon="sunny-morning"
          onPress={() => navigation.navigate('FoodDetails', { 
            foodId: dailyMeals.breakfast?.id 
          })}
        />

        <MealCard
          title="Lunch"
          meal={dailyMeals.lunch}
          time="12:00 - 2:00 PM"
          icon="sunny"
          onPress={() => navigation.navigate('FoodDetails', { 
            foodId: dailyMeals.lunch?.id 
          })}
        />

        <MealCard
          title="Dinner"
          meal={dailyMeals.dinner}
          time="7:00 - 9:00 PM"
          icon="weather-night"
          onPress={() => navigation.navigate('FoodDetails' as const, { 
            foodId: dailyMeals.dinner?.id 
          })}
        />

        {dailyMeals.snacks?.map((snack: any, index: number) => (
          <MealCard
            key={snack.id}
            title={`Snack ${index + 1}`}
            meal={snack}
            time={index === 0 ? "10:30 AM" : "4:30 PM"}
            icon="food-apple"
            onPress={() => navigation.navigate('FoodDetails', { 
              foodId: snack.id 
            })}
          />
        ))}
      </BlurContainer>
    </ScrollView>
  );
};

const NutritionCard = ({ title, current, target, unit, icon }: any) => (
  <View style={styles.nutritionCard}>
    <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
    <Text style={styles.nutritionTitle}>{title}</Text>
    <Text style={styles.nutritionValue}>
      {current} / {target} {unit}
    </Text>
    <View style={styles.progressBar}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${(current / target) * 100}%` }
        ]} 
      />
    </View>
  </View>
);

const MealCard = ({ title, meal, time, icon, onPress }: any) => (
  <TouchableOpacity style={styles.mealCard} onPress={onPress}>
    {meal ? (
      <>
        <Image source={{ uri: meal.image }} style={styles.mealImage} />
        <View style={styles.mealInfo}>
          <Text style={styles.mealTitle}>{title}</Text>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealTime}>
            <MaterialCommunityIcons name={icon} size={16} color={COLORS.textSecondary} />
            {" "}{time}
          </Text>
          <Text style={styles.mealCalories}>{meal.calories} calories</Text>
        </View>
      </>
    ) : (
      <View style={styles.placeholderContent}>
        <MaterialCommunityIcons name="plus" size={24} color={COLORS.primary} />
        <Text style={styles.placeholderText}>Add {title}</Text>
      </View>
    )}
  </TouchableOpacity>
);

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
  progressSection: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  mealPlanSection: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionValue: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.primary,
    marginTop: 8,
    fontSize: 16,
  },
  mealName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  mealCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  mealTimeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealTimeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  mealImage: {
    width: 80,
    height: 80,
  },
  mealInfo: {
    flex: 1,
    padding: 12,
  },
  mealDescription: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});

export default DashboardScreen;
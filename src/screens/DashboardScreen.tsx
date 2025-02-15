import React, { useState, useCallback, useMemo } from 'react';
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
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { BlurContainer } from '../components/BlurContainer';
import { foodService } from '../services/foodService';
import { useRecentMeals } from '../hooks/useRecentMeals';

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

interface SearchResult {
  id: string;
  type: 'meal' | 'workout' | 'plan';
  title: string;
  subtitle: string;
  image: any;
  route: string;
  params: Record<string, unknown>;
}
const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
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

  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchAnimation = React.useRef(new Animated.Value(0)).current;

  // First, add this state to track active time
  const [activeTime, setActiveTime] = useState("7:00 AM");

  React.useEffect(() => {
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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 0) {
      setShowSearch(true);
      // Animate search results
      Animated.spring(searchAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      // Search across different categories
      const results: SearchResult[] = [];

      // Search meals
      const mealResults = await foodService.searchFoodItems(query);
      results.push(...mealResults.map(meal => ({
        id: meal.id,
        type: 'meal' as const,
        title: meal.name,
        subtitle: `${meal.calories} calories`,
        image: meal.image,
        route: 'FoodDetails',
        params: { foodId: meal.id }
      })));

      // Search workouts
      const matchingWorkouts = workoutPlans.filter(
        wp => wp.title.toLowerCase().includes(query.toLowerCase())
      );
      results.push(...matchingWorkouts.map(workout => ({
        id: workout.id,
        type: 'workout' as const,
        title: workout.title,
        subtitle: workout.duration,
        image: workout.image,
        route: 'WorkoutDetails',
        params: { workout }
      })));

      setSearchResults(results);
    } else {
      setShowSearch(false);
      Animated.spring(searchAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
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

  const SearchResultsList = () => {
    if (!showSearch) return null;

    return (
      <Animated.View 
        style={[
          styles.searchResults,
          {
            opacity: searchAnimation,
            transform: [{
              translateY: searchAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }]
          }
        ]}
      >
        {searchResults.length > 0 ? (
          <ScrollView style={styles.searchScroll}>
            {searchResults.map((result) => (
              <TouchableOpacity
                key={`${result.type}-${result.id}`}
                style={styles.searchResultItem}
                onPress={() => {
                  const route = result.route;
                  navigation.navigate(route, result.params);
                  setShowSearch(false);
                  setSearchQuery('');
                }}
              >
                <Image source={result.image} style={styles.searchResultImage} />
                <View style={styles.searchResultInfo}>
                  <Text style={styles.searchResultTitle}>{result.title}</Text>
                  <Text style={styles.searchResultSubtitle}>{result.subtitle}</Text>
                </View>
                <MaterialCommunityIcons 
                  name={
                    result.type === 'meal' ? 'food' :
                    result.type === 'workout' ? 'dumbbell' :
                    'calendar'
                  } 
                  size={24} 
                  color={COLORS.primary} 
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noResults}>
            <MaterialCommunityIcons name="magnify" size={48} color={COLORS.textSecondary} />
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>Try a different search term</Text>
          </View>
        )}
      </Animated.View>
    );
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
        colors={[
          'rgba(0, 0, 0, 0.9)',
          'rgba(25, 25, 25, 1)',
          'rgba(0, 0, 0, 0.9)',
        ]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.appTitle}>FoodieHealer</Text>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Welcome Back,</Text>
              <Text style={styles.username}>Vikram</Text>
            </View>
            <View style={styles.dateContainer}>
              <MaterialCommunityIcons 
                name="calendar-today" 
                size={14} 
                color="rgba(255, 215, 0, 0.6)" 
              />
              <Text style={styles.date}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 165, 0, 0.2)']}
              style={styles.profileGradient}
            >
              <Image 
                source={require('../assets/images/profile.jpg')} 
                style={styles.profileImage}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <MaterialCommunityIcons 
            name="magnify" 
            size={24} 
            color="rgba(255, 215, 0, 0.6)" 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals, workouts..."
            placeholderTextColor="rgba(255, 215, 0, 0.4)"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
              style={styles.clearSearch}
            >
              <MaterialCommunityIcons 
                name="close" 
                size={20} 
                color="rgba(255, 215, 0, 0.6)" 
              />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <SearchResultsList />
      
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

      {/* Daily Meal Suggestions */}
      <BlurContainer style={styles.suggestedMealsSection}>
        <View style={styles.sectionHeaderEnhanced}>
          <View>
            <Text style={styles.sectionTitleLarge}>Suggested Meals</Text>
            <Text style={styles.sectionSubtitle}>Personalized for your goals</Text>
          </View>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={COLORS.primary} />
        </View>

        {suggestedMeals.map((mealTime) => (
          <View key={mealTime.id} style={styles.mealTimeBlock}>
            <View style={styles.mealTimeHeader}>
              <View style={styles.mealTimeBadge}>
                <MaterialCommunityIcons 
                  name={
                    mealTime.title === 'Breakfast' ? 'weather-sunny' :
                    mealTime.title === 'Lunch' ? 'weather-partly-cloudy' :
                    'weather-night'
                  } 
                  size={18} 
                  color={COLORS.white} 
                />
                <Text style={styles.mealTimeTitle}> {mealTime.title}</Text>
                <Text style={styles.mealTime}> {mealTime.time}</Text>
              </View>
            </View>

            {mealTime.suggestions.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                style={styles.enhancedMealCard}
                onPress={() => navigation.navigate('FoodDetails' as const, { foodId: meal.id })}
              >
                <Image source={meal.image} style={styles.enhancedMealImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.mealGradient}
                >
                  <View style={styles.enhancedMealInfo}>
                    <Text style={styles.enhancedMealName}>{meal.name}</Text>
                    <View style={styles.mealStats}>
                      <View style={styles.statItem}>
                        <MaterialCommunityIcons name="fire" size={16} color={COLORS.primary} />
                        <Text style={styles.statText}>{meal.calories} cal</Text>
                      </View>
                      <TouchableOpacity style={styles.addButton}>
                        <MaterialCommunityIcons name="plus" size={20} color={COLORS.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </BlurContainer>

      {/* Recent Activity Section - New */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <TouchableOpacity onPress={handleSeeAllActivities}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {/* Difficulty Selector - New */}
{renderDifficultySelector()}
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

      {/* Daily Meal Plan Section */}
      <BlurContainer style={styles.mealPlanSection}>
        <View style={styles.sectionHeaderEnhanced}>
          <View>
            <Text style={styles.sectionTitleLarge}>Today's Meal Plan</Text>
            <Text style={styles.sectionSubtitle}>Track your daily nutrition</Text>
          </View>
          <View style={styles.totalCalories}>
            <Text style={styles.caloriesText}>1800</Text>
            <Text style={styles.caloriesLabel}>cal left</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.timelineScroll}
        >
          {[
            "7:00 AM",
            "10:30 AM",
            "1:00 PM",
            "4:30 PM",
            "7:00 PM"
          ].map((time) => (
            <MealTimeIndicator
              key={time}
              time={time}
              isActive={activeTime === time}
              onPress={() => setActiveTime(time)}
            />
          ))}
        </ScrollView>

        <MealCard
          title="Breakfast"
          meal={dailyMeals.breakfast}
          time="7:00 - 9:00 AM"
          icon="weather-sunny"
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

const MealTimeIndicator: React.FC<{ 
  time: string; 
  isActive: boolean;
  onPress: () => void;
}> = ({ time, isActive, onPress }) => {
  const scaleAnim = React.useRef(new Animated.Value(isActive ? 1 : 0.8)).current;
  
  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1 : 0.8,
      tension: 20,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View 
        style={[
          styles.timeIndicator,
          isActive && styles.activeTimeIndicator,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <MaterialCommunityIcons
          name={isActive ? 'clock-check' : 'clock-outline'}
          size={16}
          color={isActive ? '#FFD700' : COLORS.textSecondary}
        />
        <Text style={[styles.timeText, isActive && styles.activeTimeText]}>{time}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const MealCard: React.FC<{
  title: string;
  meal: any;
  time: string;
  icon: string;
  onPress: () => void;
}> = ({ title, meal, time, icon, onPress }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 40,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[
        styles.mealCardContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <LinearGradient
          colors={meal ? 
            ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'] :
            ['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mealCardGradient}
        >
          {meal ? (
            <>
              <Image 
                source={{ uri: meal.image }} 
                style={styles.mealImage}
              />
              <View style={styles.mealContent}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealTitle}>{title}</Text>
                  <View style={styles.timeChip}>
                    <MaterialCommunityIcons name={icon as any} size={14} color={COLORS.primary} />
                    <Text style={styles.timeText}>{time}</Text>
                  </View>
                </View>
                <Text style={styles.mealName}>{meal.name}</Text>
                <View style={styles.mealStats}>
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons name="fire" size={14} color={COLORS.primary} />
                    <Text style={styles.statText}>{meal.calories} cal</Text>
                  </View>
                  {meal.protein && (
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="food-steak" size={14} color={COLORS.primary} />
                      <Text style={styles.statText}>{meal.protein}g protein</Text>
                    </View>
                  )}
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyMealContent}>
              <MaterialCommunityIcons name="plus-circle" size={30} color={COLORS.primary} />
              <Text style={styles.emptyMealText}>Add {title}</Text>
              <Text style={styles.emptyMealSubtext}>Plan your meal for {time}</Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 48,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: 6,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  date: {
    fontSize: 12,
    color: 'rgba(255, 215, 0, 0.8)',
    marginLeft: 6,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileGradient: {
    width: '100%',
    height: '100%',
    padding: 2,
    borderRadius: 24,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 20,
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  searchInput: {
    flex: 1,
    color: '#FFD700',
    marginLeft: 10,
    fontSize: 16,
  },
  clearSearch: {
    padding: 4,
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
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
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
  suggestedMealsSection: {
    margin: 16,
    padding: 16,
    borderRadius: 20,
  },
  sectionHeaderEnhanced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  sectionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  mealTimeBlock: {
    marginBottom: 24,
  },
  mealTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  enhancedMealCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  enhancedMealImage: {
    width: '100%',
    height: '100%',
  },
  mealGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 16,
    justifyContent: 'flex-end',
  },
  enhancedMealInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  enhancedMealName: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statText: {
    color: '#FFD700',
    fontSize: 12,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
  },
  timeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  activeTimeIndicator: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderColor: '#FFD700',
  },
  timeText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  activeTimeText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  totalCalories: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  caloriesText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  caloriesLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  timelineScroll: {
    marginVertical: 20,
  },
  searchResults: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    margin: 16,
    maxHeight: 400,
    zIndex: 1000,
    ...SHADOWS.medium,
  },
  searchScroll: {
    padding: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
  },
  searchResultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  noResults: {
    alignItems: 'center',
    padding: 32,
  },
  noResultsText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  noResultsSubtext: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  standardMealCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  standardMealImage: {
    width: 80,
    height: 80,
  },
  standardMealInfo: {
    flex: 1,
    padding: 12,
  },
  mealCardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  mealCardGradient: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mealContent: {
    flex: 1,
    marginLeft: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  emptyMealContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  emptyMealText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  emptyMealSubtext: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});

export default DashboardScreen;
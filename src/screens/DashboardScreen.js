import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Correct import for Expo
import { PieChart } from 'react-native-chart-kit';
import { colors } from '../styles/colors';
import { Animated } from 'react-native';

// Helper Function: Get Greeting Based on Time of Day
const getGreeting = (username) => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return `Good Morning, ${username}! 🌞`;
  } else if (hour < 18) {
    return `Good Afternoon, ${username}! 🌤️`;
  } else {
    return `Good Evening, ${username}! 🌙`;
  }
};

const DashboardScreen = ({ navigation, route }) => {
  // Retrieve username from route parameters or default to "Guest"
  const { username } = route.params || { username: 'Guest' };

  // Animation for greeting text
  const fadeAnim = new React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={['#FF9800', '#F44336']}
        style={styles.header}
      >
        <Animated.Text style={[styles.greeting, { opacity: fadeAnim }]}>
          {getGreeting(username)}
        </Animated.Text>
        <Text style={styles.motivationalQuote}>
          "Eat clean, train mean, live green!"
        </Text>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.stats}>
        <Text style={styles.stat}>Calories Consumed: 1,200</Text>
        <Text style={styles.stat}>Target: 2,000</Text>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.darkPurple }]}
          onPress={() => navigation.navigate('AddMeal')}
          accessibilityLabel="Log a Healthy Meal"
        >
          <Text style={styles.actionText}>Log a Healthy Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.darkPurple }]}
          onPress={() => navigation.navigate('TrackWorkout')}
          accessibilityLabel="Start Workout"
        >
          <Text style={styles.actionText}>Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.darkPurple }]}
          onPress={() => navigation.navigate('NutritionGoals')}
          accessibilityLabel="View Nutritional Goals"
        >
          <Text style={styles.actionText}>View Nutritional Goals</Text>
        </TouchableOpacity>
        {/* New Quick Action for Personalized Diet Planner */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.babyPink }]}
          onPress={() => navigation.navigate('PersonalizedDietPlanner')}
          accessibilityLabel="Open Personalized Diet Planner"
        >
          <Text style={styles.actionText}>Personalized Diet Planner</Text>
        </TouchableOpacity>
      </View>

      {/* Food Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        <View style={styles.mealCards}>
          <TouchableOpacity
            style={styles.mealCard}
            onPress={() => navigation.navigate('MealLog')}
            accessibilityLabel="Log Breakfast"
          >
            <Text style={styles.mealText}>Breakfast: Oatmeal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mealCard}
            onPress={() => navigation.navigate('MealLog')}
            accessibilityLabel="Log Lunch"
          >
            <Text style={styles.mealText}>Lunch: Salad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mealCard}
            onPress={() => navigation.navigate('MealLog')}
            accessibilityLabel="Log Dinner"
          >
            <Text style={styles.mealText}>Dinner: Grilled Chicken</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nutritional Breakdown Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutritional Breakdown</Text>
        <PieChart
          data={[
            { name: 'Protein', population: 40, color: '#FF6384', legendFontColor: '#7F7F7F' },
            { name: 'Carbs', population: 30, color: '#36A2EB', legendFontColor: '#7F7F7F' },
            { name: 'Fat', population: 30, color: '#FFCE56', legendFontColor: '#7F7F7F' },
          ]}
          width={300} // Fixed width for simplicity
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Fitness Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Summary</Text>
        <TouchableOpacity
          style={styles.workoutCard}
          onPress={() => navigation.navigate('TrackWorkout')}
          accessibilityLabel="Track Push-ups"
        >
          <Text style={styles.workoutText}>Push-ups (3 sets)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.workoutCard}
          onPress={() => navigation.navigate('TrackWorkout')}
          accessibilityLabel="Track Squats"
        >
          <Text style={styles.workoutText}>Squats (4 sets)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.workoutCard}
          onPress={() => navigation.navigate('TrackWorkout')}
          accessibilityLabel="Track Plank"
        >
          <Text style={styles.workoutText}>Plank (2 minutes)</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Chart Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calories Consumed vs Target</Text>
        <PieChart
          data={[
            { name: 'Consumed', population: 1200, color: '#FF6384', legendFontColor: '#7F7F7F' },
            { name: 'Remaining', population: 800, color: '#36A2EB', legendFontColor: '#7F7F7F' },
          ]}
          width={300} // Fixed width for simplicity
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Community Challenges Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Community Challenges</Text>
        <TouchableOpacity style={styles.challengeCard}>
          <Text style={styles.challengeText}>Challenge 1: 10,000 Steps a Day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.challengeCard}>
          <Text style={styles.challengeText}>Challenge 2: Drink 2 Liters of Water</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.challengeCard}>
          <Text style={styles.challengeText}>Challenge 3: No Junk Food for a Week</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.lightPurple,
  },
  header: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  motivationalQuote: {
    fontSize: 16,
    color: colors.white,
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    fontSize: 16,
    color: colors.darkPurple,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkPurple,
  },
  mealCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  mealText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
  workoutCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
  challengeCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  challengeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
});

export default DashboardScreen;
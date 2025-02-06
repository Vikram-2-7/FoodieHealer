// src/screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { colors } from '../styles/colors';

const screenWidth = Dimensions.get('window').width;

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
  const fadeAnim = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.Text style={[styles.greeting, { opacity: fadeAnim }]}>
        {getGreeting(username)}
      </Animated.Text>
      <Text style={styles.motivationalQuote}>Eat clean, train mean, live green!</Text>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.babyPink }]}
          onPress={() => navigation.navigate('AddMeal')}
        >
          <Text style={styles.actionText}>Log a Healthy Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.darkPurple }]}
          onPress={() => navigation.navigate('TrackWorkout')}
        >
          <Text style={styles.actionText}>Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.babyPink }]}
          onPress={() => navigation.navigate('NutritionGoals')}
        >
          <Text style={styles.actionText}>View Nutritional Goals</Text>
        </TouchableOpacity>
      </View>

      {/* Food Section */}
      <Text style={styles.sectionTitle}>Today's Meals</Text>
      <View style={styles.mealCards}>
        <TouchableOpacity
          style={styles.mealCard}
          onPress={() => navigation.navigate('MealLog')}
        >
          <Text style={styles.mealText}>Breakfast: Oatmeal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mealCard}
          onPress={() => navigation.navigate('MealLog')}
        >
          <Text style={styles.mealText}>Lunch: Salad</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mealCard}
          onPress={() => navigation.navigate('MealLog')}
        >
          <Text style={styles.mealText}>Dinner: Grilled Chicken</Text>
        </TouchableOpacity>
      </View>

      {/* Nutritional Breakdown Chart */}
      <Text style={styles.sectionTitle}>Nutritional Breakdown</Text>
      <PieChart
        data={[
          { name: 'Protein', population: 40, color: '#FF6384', legendFontColor: '#7F7F7F' },
          { name: 'Carbs', population: 30, color: '#36A2EB', legendFontColor: '#7F7F7F' },
          { name: 'Fats', population: 30, color: '#FFCE56', legendFontColor: '#7F7F7F' },
        ]}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* Progress Chart */}
      <Text style={styles.sectionTitle}>Calories Consumed vs Target</Text>
      <PieChart
        data={[
          { name: 'Consumed', population: 1200, color: '#FF6384', legendFontColor: '#7F7F7F' },
          { name: 'Remaining', population: 800, color: '#36A2EB', legendFontColor: '#7F7F7F' },
        ]}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.lightPurple,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkPurple,
    textAlign: 'center',
  },
  motivationalQuote: {
    fontSize: 16,
    color: colors.darkPurple,
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'center',
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
});

export default DashboardScreen;
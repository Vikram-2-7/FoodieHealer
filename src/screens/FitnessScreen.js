// src/screens/FitnessScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

const FitnessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Fitness Section</Text>

      {/* Menu Container */}
      <View style={styles.menuContainer}>
        {/* Track Workout Button */}
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.darkPurple }]}
          onPress={() => navigation.navigate('TrackWorkout')}
        >
          <Text style={styles.menuText}>Track Workout</Text>
          <Text style={styles.menuDescription}>Log your workouts and progress.</Text>
        </TouchableOpacity>

        {/* View Exercises Button */}
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.babyPink }]}
          onPress={() => navigation.navigate('ViewExercises')}
        >
          <Text style={styles.menuText}>View Exercises</Text>
          <Text style={styles.menuDescription}>Browse a list of exercises.</Text>
        </TouchableOpacity>

        {/* Fitness Goals Button */}
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.lightPurple }]}
          onPress={() => navigation.navigate('FitnessGoals')}
        >
          <Text style={styles.menuText}>Fitness Goals</Text>
          <Text style={styles.menuDescription}>Set and track your fitness goals.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightPurple, // Light purple background for the screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.darkPurple, // Dark purple for the title
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 5, // Add shadow for depth
    alignItems: 'flex-start', // Align text to the left
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white, // White text for contrast
  },
  menuDescription: {
    fontSize: 14,
    color: colors.white, // White text for description
    marginTop: 5,
  },
});

export default FitnessScreen;
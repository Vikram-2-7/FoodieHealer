import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/colors';

const StartWorkoutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Start Your Workout</Text>
      
      <View style={styles.workoutList}>
        <TouchableOpacity style={styles.workoutItem}>
          <Text style={styles.workoutTitle}>Cardio</Text>
          <Text style={styles.workoutDescription}>30 min running, cycling, or swimming</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.workoutItem}>
          <Text style={styles.workoutTitle}>Strength Training</Text>
          <Text style={styles.workoutDescription}>45 min weight training</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.workoutItem}>
          <Text style={styles.workoutTitle}>Yoga</Text>
          <Text style={styles.workoutDescription}>20 min flexibility and balance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 20,
  },
  workoutList: {
    gap: 15,
  },
  workoutItem: {
    backgroundColor: colors.lightPurple,
    padding: 20,
    borderRadius: 10,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 5,
  },
  workoutDescription: {
    color: '#666',
  },
});

export default StartWorkoutScreen;
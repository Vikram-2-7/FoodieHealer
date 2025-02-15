// src/screens/TrackWorkoutScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const TrackWorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Workout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightPurple,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
});

export default TrackWorkoutScreen;
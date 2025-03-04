import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';
import { WorkoutSessionScreenProps } from '../types/navigation';

const WorkoutSession = ({ route }: WorkoutSessionScreenProps) => {
  const { workout, activity } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {workout?.title || activity?.name || 'Workout Session'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
});

export default WorkoutSession; 
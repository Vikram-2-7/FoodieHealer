import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

interface WorkoutSessionProps {
  route: {
    params: {
      workout?: any;
      activity?: any;
    };
  };
}

const WorkoutSession: React.FC<WorkoutSessionProps> = ({ route }) => {
  const { workout, activity } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {workout?.title || activity?.title || 'Workout Session'}
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
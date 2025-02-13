import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';

const WorkoutDetails = ({ route, navigation }) => {
  const { workout } = route.params;

  const handleStartWorkout = () => {
    navigation.navigate('WorkoutSession', { workout });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={workout.image} style={styles.coverImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{workout.title}</Text>
        <View style={styles.statsRow}>
          {/* Workout stats */}
        </View>

        <View style={styles.exercisesList}>
          {/* Exercise list */}
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartWorkout}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... styles
});

export default WorkoutDetails; 
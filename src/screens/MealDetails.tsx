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
import { NavigationProps } from '../types/navigation';

const MealDetails = ({ route, navigation }: NavigationProps) => {
  const { meal } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={meal.image} style={styles.coverImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{meal.title}</Text>
        <Text style={styles.calories}>{meal.calories} calories</Text>
        
        <View style={styles.nutritionInfo}>
          {/* Add nutrition details */}
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.startButtonText}>Add to Meal Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  calories: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 20,
  },
  nutritionInfo: {
    marginVertical: 20,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealDetails; 
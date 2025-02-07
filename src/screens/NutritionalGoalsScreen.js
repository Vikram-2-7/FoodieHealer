import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/colors';

const NutritionalGoalsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Nutritional Goals</Text>

      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Daily Calorie Goal</Text>
        <Text style={styles.goalValue}>2000 kcal</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '75%' }]} />
        </View>
        <Text style={styles.progressText}>1500/2000 kcal consumed</Text>
      </View>

      <View style={styles.macrosContainer}>
        <Text style={styles.sectionTitle}>Macronutrients</Text>
        
        <View style={styles.macroItem}>
          <Text style={styles.macroTitle}>Protein</Text>
          <Text style={styles.macroValue}>150g / 180g</Text>
        </View>

        <View style={styles.macroItem}>
          <Text style={styles.macroTitle}>Carbs</Text>
          <Text style={styles.macroValue}>200g / 250g</Text>
        </View>

        <View style={styles.macroItem}>
          <Text style={styles.macroTitle}>Fats</Text>
          <Text style={styles.macroValue}>45g / 60g</Text>
        </View>
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
  goalCard: {
    backgroundColor: colors.lightPurple,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 10,
  },
  goalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.babyPink,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: colors.babyPink,
    borderRadius: 5,
  },
  progressText: {
    color: '#666',
    fontSize: 14,
  },
  macrosContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightPurple,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 15,
  },
  macroItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  macroTitle: {
    fontSize: 16,
    color: colors.darkPurple,
  },
  macroValue: {
    fontSize: 16,
    color: colors.babyPink,
    fontWeight: 'bold',
  },
});

export default NutritionalGoalsScreen;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 45) / 3; // 3 buttons per row with gaps

const DashboardScreen = ({ navigation, route }) => {
  const userName = route.params?.userName || 'User';

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.greeting}>Good Evening, {userName}!</Text>
        <Text style={styles.motto}>"Eat clean, train mean, live green!"</Text>
      </View>

      {/* Calories Card */}
      <View style={styles.caloriesCard}>
        <Text style={styles.caloriesTitle}>Daily Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '60%' }]} />
        </View>
        <View style={styles.caloriesInfo}>
          <Text style={styles.caloriesText}>1,200 consumed</Text>
          <Text style={styles.caloriesText}>Target: 2,000</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#7C4DFF' }]}
          onPress={() => navigation.navigate('LogMeal')}
        >
          <Ionicons name="restaurant" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Log Meal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FF5252' }]}
          onPress={() => navigation.navigate('StartWorkout')}
        >
          <Ionicons name="fitness" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
          onPress={() => navigation.navigate('NutritionalGoals')}
        >
          <Ionicons name="trophy" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('Diet Planner')}
        >
          <Ionicons name="calendar" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Planner</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
          onPress={() => navigation.navigate('Progress')}
        >
          <Ionicons name="trending-up" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#E91E63' }]}
          onPress={() => navigation.navigate('Community')}
        >
          <Ionicons name="people" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Meals */}
      <View style={styles.mealsSection}>
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.mealCard}>
            <Ionicons name="sunny" size={24} color="#FF9800" />
            <Text style={styles.mealType}>Breakfast</Text>
            <Text style={styles.mealName}>Oatmeal</Text>
          </View>

          <View style={styles.mealCard}>
            <Ionicons name="partly-sunny" size={24} color="#2196F3" />
            <Text style={styles.mealType}>Lunch</Text>
            <Text style={styles.mealName}>Salad</Text>
          </View>

          <View style={styles.mealCard}>
            <Ionicons name="moon" size={24} color="#7C4DFF" />
            <Text style={styles.mealType}>Dinner</Text>
            <Text style={styles.mealName}>Grilled Chicken</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FF6B6B',
    elevation: 3,
  },
  greeting: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  motto: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  caloriesCard: {
    backgroundColor: '#FFF',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
  },
  caloriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#7C4DFF',
    borderRadius: 4,
  },
  caloriesInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  caloriesText: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 7.5,
    justifyContent: 'center',
  },
  actionButton: {
    width: buttonWidth,
    height: 80,
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 7.5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  mealsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mealCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    width: 100,
    alignItems: 'center',
    elevation: 2,
  },
  mealType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  mealName: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
});

export default DashboardScreen;
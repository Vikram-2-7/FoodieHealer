import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from '../services/foodService';

const RECENT_MEALS_KEY = 'recent_meals';
const MAX_RECENT_MEALS = 10;

export const useRecentMeals = () => {
  const [recentMeals, setRecentMeals] = useState<FoodItem[]>([]);

  useEffect(() => {
    loadRecentMeals();
  }, []);

  const loadRecentMeals = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_MEALS_KEY);
      if (stored) {
        setRecentMeals(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recent meals:', error);
    }
  };

  const addToRecent = async (meal: FoodItem) => {
    try {
      const updatedRecent = [
        meal,
        ...recentMeals.filter(item => item.id !== meal.id)
      ].slice(0, MAX_RECENT_MEALS);
      
      setRecentMeals(updatedRecent);
      await AsyncStorage.setItem(RECENT_MEALS_KEY, JSON.stringify(updatedRecent));
    } catch (error) {
      console.error('Error saving recent meal:', error);
    }
  };

  return {
    recentMeals,
    addToRecent
  };
}; 
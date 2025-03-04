import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from '../services/foodService';

export const addFoodToMealTime = async (food: FoodItem, mealTime: string) => {
  try {
    const key = `${mealTime.toLowerCase()}_foods`;
    const existingFoods = await AsyncStorage.getItem(key);
    let foods = existingFoods ? JSON.parse(existingFoods) : [];
    
    // Check if food already exists
    if (!foods.find((f: FoodItem) => f.id === food.id)) {
      foods.push(food);
      await AsyncStorage.setItem(key, JSON.stringify(foods));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding food to meal time:', error);
    return false;
  }
}; 
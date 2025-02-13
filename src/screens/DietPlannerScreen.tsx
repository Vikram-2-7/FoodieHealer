import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { useCart } from '../hooks/useCart';

interface FoodItem {
  id: string;
  name: string;
  image: any;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  category: string;
  description: string;
}

const DietPlannerScreen = ({ navigation }) => {
  const { addToCart } = useCart();
  
  const [foodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Greek Yogurt Bowl',
      image: require('../assets/images/meals/breakfast.jpg'),
      calories: 320,
      protein: 22,
      carbs: 45,
      fat: 8,
      price: 12.99,
      category: 'Breakfast',
      description: 'High protein Greek yogurt with fresh berries and honey',
    },
    // Add more food items
  ]);

  const handleAddToCart = (item: FoodItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    Alert.alert('Success', 'Added to cart!');
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.foodCard}>
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodCategory}>{item.category}</Text>
        
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionText}>{item.calories} cal</Text>
          <Text style={styles.nutritionText}>P: {item.protein}g</Text>
          <Text style={styles.nutritionText}>C: {item.carbs}g</Text>
          <Text style={styles.nutritionText}>F: {item.fat}g</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>${item.price}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <MaterialCommunityIcons name="cart-plus" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
  },
  foodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  foodImage: {
    width: '100%',
    height: 200,
  },
  foodInfo: {
    padding: 16,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  foodCategory: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nutritionText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
  },
});

export default DietPlannerScreen; 
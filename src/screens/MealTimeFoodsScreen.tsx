import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { FoodItemCard } from '../components/FoodItemCard';
import { BackButton } from '../components/BackButton';
import { useCart } from '../hooks/useCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from '../services/foodService';
import { BlurContainer } from '../components/BlurContainer';
import { CachedImage } from '../components/CachedImage';

const MealTimeFoodsScreen = ({ route, navigation }: any) => {
  const { mealTime } = route.params;
  const [mealTimeFoods, setMealTimeFoods] = useState<FoodItem[]>([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = ['RECENT', 'ALL', 'BREAKFAST', 'LUNCH', 'DINNER'];

  useEffect(() => {
    loadMealTimeFoods();
  }, [mealTime]);

  const loadMealTimeFoods = async () => {
    try {
      const storedFoods = await AsyncStorage.getItem(`${mealTime.toLowerCase()}_foods`);
      if (storedFoods) {
        setMealTimeFoods(JSON.parse(storedFoods));
      }
    } catch (error) {
      console.error('Error loading meal time foods:', error);
      Alert.alert('Error', 'Failed to load meal time foods');
    } finally {
      setLoading(false);
    }
  };

  const removeMealTimeFood = async (foodId: string) => {
    try {
      const updatedFoods = mealTimeFoods.filter(food => food.id !== foodId);
      await AsyncStorage.setItem(
        `${mealTime.toLowerCase()}_foods`,
        JSON.stringify(updatedFoods)
      );
      setMealTimeFoods(updatedFoods);
      Alert.alert('Success', 'Food removed from meal time');
    } catch (error) {
      console.error('Error removing food:', error);
      Alert.alert('Error', 'Failed to remove food');
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals, dishes..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <TouchableOpacity style={styles.filterButton}>
        <MaterialCommunityIcons name="tune" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.categoryButton,
              item === 'ALL' && styles.activeCategoryButton
            ]}
          >
            <Text style={[
              styles.categoryText,
              item === 'ALL' && styles.activeCategoryText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderCategories()}
      <BackButton />
      
      <BlurContainer style={styles.header}>
        <Text style={styles.title}>{mealTime} Foods</Text>
        <Text style={styles.subtitle}>Your planned meals for {mealTime.toLowerCase()}</Text>
      </BlurContainer>

      <FlatList
        data={mealTimeFoods}
        renderItem={({ item }) => (
          <FoodItemCard
            item={item}
            onAddToCart={addToCart}
            onRemove={() => removeMealTimeFood(item.id)}
            showRemoveButton
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No foods added for {mealTime.toLowerCase()} yet</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,215,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  mealCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mealImage: {
    width: '100%',
    height: 200,
  },
  mealInfo: {
    padding: 16,
  },
  mealTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealDescription: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MealTimeFoodsScreen; 
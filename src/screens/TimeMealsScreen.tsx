import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../styles/theme';
import { LAYOUT } from '../constants/layout';
import { FoodItemCard } from '../components/FoodItemCard';
import { useCart } from '../hooks/useCart';
import { useFoodData } from '../hooks/useFoodData';
import { DietPlannerHeader } from '../components/DietPlannerHeader';
import { TimeMealsScreenProps } from '../types/navigation';

type MealTime = 'BREAKFAST' | 'LUNCH' | 'DINNER';

const TimeMealsScreen = ({ route }: TimeMealsScreenProps) => {
  const { mealTime } = route.params;
  const { addToCart } = useCart();
  const {
    foodItems,
    loading,
    refreshing,
    error,
    onRefresh,
  } = useFoodData(mealTime);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DietPlannerHeader 
        searchQuery=""
        onSearchChange={() => {}}
        onFilterPress={() => {}}
      />
      
      <FlatList
        data={foodItems}
        renderItem={({ item }) => (
          <FoodItemCard
            item={item}
            onAddToCart={addToCart}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: LAYOUT.safeArea.top,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: LAYOUT.spacing.m,
    paddingBottom: LAYOUT.sizes.tabBarHeight + LAYOUT.spacing.xl,
  },
});

export default TimeMealsScreen; 
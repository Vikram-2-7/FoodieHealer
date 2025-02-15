import React, { useState } from 'react';
import { foodService, FoodItem } from '../services/foodService';

export const useFoodData = (initialCategory: string = 'ALL') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [hasMore, setHasMore] = useState(true);

  const loadFoodItems = React.useCallback(async (refresh = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await foodService.getFoodItems({
        category: currentCategory === 'ALL' ? undefined : currentCategory,
        search: '',
      });

      setFoodItems(prev => refresh ? response.items : [...prev, ...response.items]);
      setHasMore(response.hasMore);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error loading food items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentCategory, loading]);

  const searchFoodItems = React.useCallback(async (query: string) => {
    try {
      setLoading(true);
      console.log('Starting search for:', query); // Debug log
      const items = await foodService.searchFoodItems(query);
      console.log('Search results:', items.length); // Debug log
      setFoodItems(items);
      setError(null);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search food items');
    } finally {
      setLoading(false);
    }
  }, []);

  const getFoodItemsByCategory = React.useCallback(async (category: string) => {
    try {
      setLoading(true);
      const items = await foodService.getFoodItems({ category });
      setFoodItems(items.items);
      setError(null);
    } catch (err) {
      setError('Failed to fetch food items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadFoodItems(true);
  }, [currentCategory]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadFoodItems(true);
  }, [loadFoodItems]);

  return {
    foodItems,
    loading,
    refreshing,
    hasMore,
    error,
    onRefresh,
    loadMore: loadFoodItems,
    changeCategory: setCurrentCategory,
    currentCategory,
    searchFoodItems,
    getFoodItemsByCategory,
    setLoading,
    setFoodItems,
  };
}; 
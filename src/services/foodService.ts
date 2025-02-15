import { foodApiService } from './foodApiService';
import { mockFoodData } from '../data/mockFoodData';

export interface FoodItem {
  id: string;
  name: string;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACKS' | 'DRINKS';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  price: number;
  description: string;
  ingredients: string[];
  preparationTime: string;
  tags: string[];
  nutritionScore: number;
  rating: number;
  reviews: number;
}

export interface FoodResponse {
  items: FoodItem[];
  totalCount: number;
  hasMore: boolean;
}

class FoodService {
  async getFoodItems(params: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<FoodResponse> {
    try {
      let items: FoodItem[] = [];
      
      if (params.search) {
        // Use API for search
        items = await foodApiService.searchFood(params.search);
      } else if (params.category) {
        // Use API for category filtering
        items = await foodApiService.getFoodItemsByCategory(params.category);
      } else {
        // Fallback to mock data for initial load
        items = mockFoodData.items.map(item => ({
          ...item,
          category: item.category as FoodItem['category'] // Cast string category to union type
        }));
      }

      return {
        items,
        totalCount: items.length,
        hasMore: false
      };
    } catch (error) {
      console.error('Food service error:', error);
      // Fallback to mock data if API fails
      return {
        items: mockFoodData.items.map(item => ({
          ...item,
          category: item.category as FoodItem['category'] // Cast string category to union type
        })),
        totalCount: mockFoodData.items.length,
        hasMore: false
      };
    }
  }

  async searchFoodItems(query: string): Promise<FoodItem[]> {
    try {
      // Direct API search
      return await foodApiService.searchFood(query);
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to local search in mock data
      return mockFoodData.items.map(item => ({
        ...item,
        category: item.category as FoodItem['category'] // Cast string category to union type
      })).filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
}

export const foodService = new FoodService(); 
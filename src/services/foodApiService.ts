import axios from 'axios';
import { FoodItem } from './foodService';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class FoodApiService {
  async searchFood(query: string, limit: number = 10): Promise<FoodItem[]> {
    try {
      const response = await axios.get(`${BASE_URL}/search.php`, {
        params: { s: query }
      });

      // Bind the transform function to maintain 'this' context
      return (response.data.meals || [])
        .slice(0, limit)
        .map((meal: any) => this.transformMealDBToFoodItem(meal));
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  async getFoodDetails(id: string): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php`, {
        params: { i: id }
      });

      if (!response.data.meals?.[0]) {
        throw new Error('Meal not found');
      }

      const meal = response.data.meals[0];
      const ingredients = this.getIngredients(meal);
      const instructions = this.getInstructions(meal.strInstructions);
      const baseNutrition = this.calculateBaseNutrition(ingredients.length);

      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: this.mapCategory(meal.strCategory || 'Main Course'),
        description: meal.strInstructions?.split('.')[0] + '.' || 'No description available',
        calories: baseNutrition.calories,
        protein: baseNutrition.protein,
        carbs: baseNutrition.carbs,
        fat: baseNutrition.fat,
        price: this.calculatePrice(baseNutrition.calories),
        ingredients,
        instructions,
        preparationTime: this.estimatePreparationTime(instructions.length),
        tags: [
          meal.strCategory,
          meal.strArea,
          this.mapCategory(meal.strCategory || 'Main Course')
        ].filter(Boolean),
        nutritionScore: this.calculateNutritionScore(baseNutrition),
        rating: 4 + (Math.random() * 0.9),
        reviews: 50 + Math.floor(Math.random() * 150),
      };
    } catch (error) {
      console.error('Error fetching food details:', error);
      throw error;
    }
  }

  private getInstructions(instructions: string | undefined): string[] {
    if (!instructions) return ['No instructions available'];
    return instructions
      .split(/\r\n|\n|\r/g)
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }

  private getIngredients(meal: any): string[] {
    if (!meal) return [];
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    return ingredients;
  }
  private transformMealDBToFoodItem(meal: any): FoodItem {
    if (!meal) {
      throw new Error('Cannot transform null meal to FoodItem');
    }

    try {
      const ingredients = this.getIngredients(meal);
      const ingredientCount = ingredients.length;
      const baseNutrition = {
        calories: 200 + (ingredientCount * 50),
        protein: 10 + (ingredientCount * 2),
        carbs: 20 + (ingredientCount * 3),
        fat: 8 + (ingredientCount * 1.5),
      };

      return {
        id: meal.idMeal,
        name: meal.strMeal,
        category: this.mapCategory(meal.strCategory || 'Main Course'),
        calories: Math.round(baseNutrition.calories),
        protein: Math.round(baseNutrition.protein),
        carbs: Math.round(baseNutrition.carbs),
        fat: Math.round(baseNutrition.fat),
        image: meal.strMealThumb,
        price: this.calculatePrice(baseNutrition.calories),
        description: (meal.strInstructions || '').split('.')[0] + '.',
        ingredients: ingredients,
        preparationTime: `${Math.max(15, Math.min(60, ingredients.length * 5))} mins`,
        tags: [
          meal.strCategory, 
          meal.strArea, 
          this.mapCategory(meal.strCategory || 'Main Course')
        ].filter(Boolean),
        nutritionScore: this.calculateNutritionScore(baseNutrition),
        rating: 4 + (Math.random() * 0.9),
        reviews: 50 + Math.floor(Math.random() * 150),
      };
    } catch (error) {
      console.error('Error transforming meal:', error);
      throw new Error('Failed to transform meal to FoodItem');
    }
  }

  private estimatePreparationTime(stepCount: number): string {
    const estimatedMinutes = Math.max(15, Math.min(60, stepCount * 5));
    return `${estimatedMinutes} mins`;
  }

  private mapCategory(category: string): 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACKS' | 'DRINKS' {
    const categoryMap: { [key: string]: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACKS' | 'DRINKS' } = {
      'Breakfast': 'BREAKFAST',
      'Starter': 'SNACKS',
      'Side': 'SNACKS',
      'Dessert': 'SNACKS',
      'Beverage': 'DRINKS',
      'Pasta': 'DINNER',
      'Beef': 'DINNER',
      'Chicken': 'DINNER',
      'Seafood': 'DINNER',
      'Vegetarian': 'LUNCH',
    };
    return categoryMap[category] || 'DINNER';
  }

  private calculatePrice(calories: number): number {
    return Number((5 + (calories / 100)).toFixed(2));
  }

  private calculateNutritionScore(nutrition: any): number {
    const proteinRatio = (nutrition.protein * 4) / nutrition.calories;
    const fatRatio = (nutrition.fat * 9) / nutrition.calories;
    const score = 3 + (proteinRatio * 2) - (fatRatio * 1);
    return Math.min(5, Math.max(1, score));
  }

  private calculateBaseNutrition(ingredientCount: number) {
    return {
      calories: 200 + (ingredientCount * 50),
      protein: 10 + (ingredientCount * 2),
      carbs: 20 + (ingredientCount * 3),
      fat: 8 + (ingredientCount * 1.5),
    };
  }

  async getFoodItemsByCategory(category: string): Promise<FoodItem[]> {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { c: this.mapCategoryToMealDB(category) }
      });

      if (!response.data.meals) return [];

      // Get full details for first 10 meals
      const detailedMeals = await Promise.all(
        response.data.meals
          .slice(0, 10)
          .map(async (meal: any) => {
            try {
              const details = await this.getFoodDetails(meal.idMeal);
              return details;
            } catch (error) {
              console.error(`Error fetching details for meal ${meal.idMeal}:`, error);
              return null;
            }
          })
      );

      return detailedMeals.filter(Boolean); // Remove any null values
    } catch (error) {
      console.error('Error fetching category:', error);
      return [];
    }
  }

  private mapCategoryToMealDB(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'BREAKFAST': 'Breakfast',
      'LUNCH': 'Main Course',
      'DINNER': 'Main Course',
      'SNACKS': 'Starter',
      'DRINKS': 'Beverage',
    };
    return categoryMap[category] || 'Main Course';
  }
}

export const foodApiService = new FoodApiService(); 
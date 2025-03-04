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

  private getFoodImage(foodName: string | undefined): string {
    try {
      if (!foodName) {
        return 'https://images.unsplash.com/photo-1547573854-74d2a71d0826';
      }

      const foodImages: { [key: string]: string } = {
        // Breakfast
        'Oatmeal': 'https://images.unsplash.com/photo-1517673400267-0251440c45dc',
        'Avocado Toast': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
        'Acai Bowl': 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
        'Pancake': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
        'Eggs Benedict': 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
        
        // Lunch/Dinner Mains
        'Chicken': 'https://images.unsplash.com/photo-1562967914-608f82629710',
        'Grilled Chicken': 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8',
        'Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        'Fish': 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659',
        'Steak': 'https://images.unsplash.com/photo-1594041680711-c949bb6b7474',
        'Pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
        'Pizza': 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143',
        'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        
        // Salads
        'Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
        'Caesar Salad': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
        'Greek Salad': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
        
        // Snacks
        'Fruit Bowl': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea',
        'Mixed Nuts': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32',
        'Yogurt': 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
        'Smoothie': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
        
        // Desserts
        'Ice Cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f',
        'Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        'Cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
        
        // Beverages
        'Coffee': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        'Tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574',
        'Juice': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38'
      };

      // First try exact match
      if (foodImages[foodName]) {
        return foodImages[foodName];
      }

      // Then try case-insensitive partial match
      const normalizedFoodName = foodName.toLowerCase();
      const matchingFood = Object.keys(foodImages).find(key => 
        normalizedFoodName.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(normalizedFoodName)
      );

      if (matchingFood) {
        return foodImages[matchingFood];
      }

      // If no match found, try to match by category
      if (normalizedFoodName.includes('salad')) {
        return foodImages['Salad'];
      } else if (normalizedFoodName.includes('smoothie')) {
        return foodImages['Smoothie'];
      } else if (normalizedFoodName.includes('bowl')) {
        return foodImages['Acai Bowl'];
      }

      // Default food image as last resort
      return 'https://images.unsplash.com/photo-1547573854-74d2a71d0826';
    } catch (error) {
      console.warn('Error getting food image:', error);
      return 'https://images.unsplash.com/photo-1547573854-74d2a71d0826';
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
      
      // First ensure we have a valid meal name
      const mealName = meal.strMeal || 'this meal';
      
      // Get the actual recipe instructions from the API with type safety
      const instructions: string[] = meal.strInstructions 
        ? meal.strInstructions
            .split(/\r\n|\n|\r/)
            .map((step: string) => step.trim())
            .filter((step: string) => step.length > 0)
            .map((step: string, index: number) => `${index + 1}. ${step}`)
        : [
            `1. Gather all ingredients for ${mealName}`,
            `2. Follow proper cooking techniques for ${mealName}`,
            `3. Cook until done and serve hot`
          ];

      // Get actual ingredients with measurements
      const ingredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure} ${ingredient}`.trim());
        }
      }

      const baseNutrition = this.calculateBaseNutrition(ingredients.length);

      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: this.mapCategory(meal.strCategory || 'Main Course'),
        description: meal.strInstructions 
          ? meal.strInstructions.split('.')[0] + '.'
          : `A delicious ${meal.strMeal} recipe`,
        calories: baseNutrition.calories,
        protein: baseNutrition.protein,
        carbs: baseNutrition.carbs,
        fat: baseNutrition.fat,
        price: this.calculatePrice(baseNutrition.calories),
        ingredients,
        instructions,
        preparationTime: `${Math.max(15, ingredients.length * 5)} mins`,
        tags: [
          meal.strCategory,
          meal.strArea,
          this.mapCategory(meal.strCategory || 'Main Course')
        ].filter(Boolean),
        nutritionScore: this.calculateNutritionScore(baseNutrition),
        rating: 4 + (Math.random() * 0.9),
        reviews: 50 + Math.floor(Math.random() * 150),
        cuisine: meal.strArea || 'International',
        youtubeLink: meal.strYoutube,
        source: meal.strSource,
      };
    } catch (error) {
      console.error('Error fetching food details:', error);
      throw error;
    }
  }

  private getInstructions(instructions: string | undefined): string[] {
    if (!instructions) return [];
    
    // Split by newlines or numbers with dots
    const steps = instructions
      .split(/(?:\r\n|\n|\r|(?<=\d\.))/)
      .map(step => step.trim())
      .filter(step => step.length > 0)
      .map(step => {
        // Remove leading numbers and dots if present
        return step.replace(/^\d+\.\s*/, '').trim();
      });

    // If splitting didn't work, try splitting by periods
    if (steps.length <= 1) {
      return instructions
        .split('.')
        .map(step => step.trim())
        .filter(step => step.length > 0)
        .map((step, index) => `${index + 1}. ${step}`);
    }

    // Add step numbers if they don't exist
    return steps.map((step, index) => {
      if (/^\d+\./.test(step)) return step;
      return `${index + 1}. ${step}`;
    });
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
      const baseNutrition = this.calculateBaseNutrition(ingredientCount);

      return {
        id: meal.idMeal || String(Date.now()),
        name: meal.strMeal || 'Unknown Meal',
        category: this.mapCategory(meal.strCategory || 'Main Course'),
        calories: Math.round(baseNutrition.calories),
        protein: Math.round(baseNutrition.protein),
        carbs: Math.round(baseNutrition.carbs),
        fat: Math.round(baseNutrition.fat),
        image: meal.strMealThumb || 'https://images.unsplash.com/photo-1547573854-74d2a71d0826',
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
      // Breakfast items
      'Breakfast': 'BREAKFAST',
      'Brunch': 'BREAKFAST',
      'Morning': 'BREAKFAST',
      
      // Lunch items
      'Lunch': 'LUNCH',
      'Sandwich': 'LUNCH',
      'Salad': 'LUNCH',
      'Soup': 'LUNCH',
      
      // Dinner items
      'Dinner': 'DINNER',
      'Main Course': 'DINNER',
      'Beef': 'DINNER',
      'Chicken': 'DINNER',
      'Seafood': 'DINNER',
      'Pasta': 'DINNER',
      
      // Snacks
      'Snack': 'SNACKS',
      'Appetizer': 'SNACKS',
      'Side': 'SNACKS',
      'Starter': 'SNACKS',
      
      // Drinks
      'Beverage': 'DRINKS',
      'Drink': 'DRINKS',
      'Smoothie': 'DRINKS',
      'Cocktail': 'DRINKS',
    };
    return categoryMap[category] || this.guessCategoryFromName(category);
  }

  private guessCategoryFromName(name: string): 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACKS' | 'DRINKS' {
    name = name.toLowerCase();
    
    if (name.includes('breakfast') || name.includes('morning') || name.includes('brunch')) {
      return 'BREAKFAST';
    }
    if (name.includes('lunch') || name.includes('sandwich') || name.includes('salad')) {
      return 'LUNCH';
    }
    if (name.includes('dinner') || name.includes('steak') || name.includes('roast')) {
      return 'DINNER';
    }
    if (name.includes('snack') || name.includes('chips') || name.includes('nuts')) {
      return 'SNACKS';
    }
    if (name.includes('drink') || name.includes('beverage') || name.includes('juice')) {
      return 'DRINKS';
    }
    
    return 'DINNER'; // Default category
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
      let searchTerms: string[] = [];
      
      switch (category) {
        case 'BREAKFAST':
          searchTerms = ['breakfast', 'pancake', 'omelette', 'cereal', 'toast', 'eggs'];
          break;
        case 'LUNCH':
          // Enhanced lunch terms
          searchTerms = [
            'lunch',
            'burger',
            'pizza',
            'sandwich',
            'salad',
            'wrap',
            'bowl',
            'curry',
            'rice'
          ];
          break;
        case 'DINNER':
          searchTerms = [
            'dinner',
            'steak', 
            'chicken',
            'fish',
            'pasta',
            'roast',
            'grill'
          ];
          break;
        case 'SNACKS':
          // Enhanced snacks terms
          searchTerms = [
            'snack',
            'appetizer',
            'chips',
            'nuts',
            'fries',
            'nachos',
            'wings',
            'dessert'
          ];
          break;
        case 'DRINKS':
          // Enhanced drinks terms
          searchTerms = [
            'drink',
            'smoothie',
            'juice',
            'shake',
            'coffee',
            'tea',
            'lemonade',
            'cocktail'
          ];
          break;
        default:
          searchTerms = ['meal'];
      }

      // Increase items per search term for more variety
      const itemsPerTerm = 3;
      const promises = searchTerms.map(term => this.searchFood(term, itemsPerTerm));
      const results = await Promise.all(promises);
      
      // Flatten and filter results
      const allItems = results.flat().filter(item => {
        const mappedCategory = this.mapCategory(item.category);
        // More lenient category matching
        if (category === 'LUNCH') {
          return mappedCategory === 'LUNCH' || item.name.toLowerCase().includes('lunch');
        }
        if (category === 'SNACKS') {
          return mappedCategory === 'SNACKS' || 
                 item.name.toLowerCase().includes('snack') ||
                 item.name.toLowerCase().includes('appetizer');
        }
        if (category === 'DRINKS') {
          return mappedCategory === 'DRINKS' || 
                 item.name.toLowerCase().includes('drink') ||
                 item.name.toLowerCase().includes('beverage');
        }
        return mappedCategory === category;
      });

      // Remove duplicates and ensure variety
      const uniqueItems = Array.from(new Map(
        allItems.map(item => [item.id, item])
      ).values()).slice(0, 20);

      // If we still don't have enough items, add some mock data
      if (uniqueItems.length < 5) {
        const mockItems = this.getMockItemsForCategory(category, 5 - uniqueItems.length);
        uniqueItems.push(...mockItems);
      }

      return uniqueItems;
    } catch (error) {
      console.error('Error fetching category items:', error);
      return this.getMockItemsForCategory(category, 5); // Fallback to mock data
    }
  }

  private getMockItemsForCategory(category: string, count: number): FoodItem[] {
    const mockItems: { [key: string]: Array<Partial<FoodItem>> } = {
      'LUNCH': [
        { name: 'Grilled Chicken Sandwich', calories: 450, category: 'LUNCH' },
        { name: 'Caesar Salad', calories: 350, category: 'LUNCH' },
        { name: 'Veggie Buddha Bowl', calories: 400, category: 'LUNCH' },
        { name: 'Tuna Wrap', calories: 380, category: 'LUNCH' },
        { name: 'Quinoa Power Bowl', calories: 420, category: 'LUNCH' },
      ],
      'SNACKS': [
        { name: 'Mixed Nuts', calories: 180, category: 'SNACKS' },
        { name: 'Cheese Platter', calories: 250, category: 'SNACKS' },
        { name: 'Hummus & Veggies', calories: 150, category: 'SNACKS' },
        { name: 'Fruit Bowl', calories: 120, category: 'SNACKS' },
        { name: 'Greek Yogurt Parfait', calories: 200, category: 'SNACKS' },
      ],
      'DRINKS': [
        { name: 'Green Smoothie', calories: 150, category: 'DRINKS' },
        { name: 'Berry Blast Shake', calories: 180, category: 'DRINKS' },
        { name: 'Iced Matcha Latte', calories: 120, category: 'DRINKS' },
        { name: 'Fresh Orange Juice', calories: 110, category: 'DRINKS' },
        { name: 'Protein Power Shake', calories: 220, category: 'DRINKS' },
      ],
    };

    return (mockItems[category] || []).slice(0, count).map((item, index) => ({
      id: `mock-${category}-${index}`,
      name: item.name || 'Mock Item',
      category: item.category as any,
      calories: item.calories || 100,
      protein: 10,
      carbs: 20,
      fat: 5,
      image: this.getFoodImage(item.name),
      price: this.calculatePrice(item.calories || 100),
      description: `Delicious ${item.name?.toLowerCase()}`,
      ingredients: ['Mixed ingredients'],
      preparationTime: '15 mins',
      tags: [category],
      nutritionScore: 4.0,
      rating: 4.5,
      reviews: 100,
    }));
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

  // Add this method to provide food-specific default instructions
  private getDefaultInstructions(foodName: string, category?: string): string[] {
    // First try to get specific recipe by food name
    const specificRecipes: { [key: string]: string[] } = {
      'Chicken Curry': [
        '1. Cut chicken into bite-sized pieces',
        '2. Sauté onions, garlic, and ginger until fragrant',
        '3. Add curry powder and spices, cook for 1 minute',
        '4. Add chicken and cook until browned',
        '5. Pour in coconut milk and simmer',
        '6. Add vegetables and cook until tender',
        '7. Season with salt and pepper to taste',
        '8. Garnish with fresh cilantro',
        '9. Serve hot with rice'
      ],
      'Caesar Salad': [
        '1. Wash and chop romaine lettuce',
        '2. Make caesar dressing with garlic, anchovies, egg, lemon, and oil',
        '3. Toast bread cubes for croutons',
        '4. Grate fresh parmesan cheese',
        '5. Toss lettuce with dressing',
        '6. Add croutons and parmesan',
        '7. Season with black pepper',
        '8. Serve immediately'
      ],
      // Add more specific recipes...
    };

    // Then try to get recipe by category
    const categoryRecipes: { [key: string]: string[] } = {
      'BREAKFAST': [
        '1. Heat pan over medium heat',
        '2. Toast bread until golden brown',
        '3. Prepare eggs to preference',
        '4. Add toppings and seasonings',
        '5. Serve with fresh fruits',
        '6. Garnish and enjoy while hot'
      ],
      'LUNCH': [
        '1. Prepare all ingredients fresh',
        '2. Cook main protein component',
        '3. Prepare side vegetables',
        '4. Combine components',
        '5. Add sauce or dressing',
        '6. Plate and serve'
      ],
      'DINNER': [
        '1. Preheat cooking surface',
        '2. Season main protein',
        '3. Cook protein to desired doneness',
        '4. Prepare accompanying sides',
        '5. Make sauce or gravy',
        '6. Plate with garnish',
        '7. Serve hot'
      ],
      'SNACKS': [
        '1. Gather fresh ingredients',
        '2. Combine components',
        '3. Season to taste',
        '4. Arrange on serving plate',
        '5. Serve immediately'
      ],
      'DRINKS': [
        '1. Chill serving glass',
        '2. Prepare fresh ingredients',
        '3. Combine liquid components',
        '4. Mix or blend thoroughly',
        '5. Add ice if needed',
        '6. Garnish and serve'
      ]
    };

    // Try to find a specific recipe first
    const normalizedFoodName = foodName.toLowerCase();
    for (const [key, recipe] of Object.entries(specificRecipes)) {
      if (key.toLowerCase().includes(normalizedFoodName) || 
          normalizedFoodName.includes(key.toLowerCase())) {
        return recipe;
      }
    }

    // If no specific recipe found, use category recipe
    if (category && categoryRecipes[category]) {
      return categoryRecipes[category].map(step => 
        step.replace('protein', this.guessMainIngredient(foodName))
      );
    }

    // If all else fails, return a generic recipe
    return [
      `1. Prepare all ingredients for ${foodName}`,
      `2. Clean and prepare main ingredients`,
      `3. Cook following safe temperature guidelines`,
      `4. Season to taste`,
      `5. Plate and serve appropriately`
    ];
  }

  // Helper method to guess the main ingredient from the food name
  private guessMainIngredient(foodName: string): string {
    const commonProteins = ['chicken', 'beef', 'fish', 'pork', 'tofu', 'lamb'];
    const normalizedName = foodName.toLowerCase();
    
    for (const protein of commonProteins) {
      if (normalizedName.includes(protein)) {
        return protein;
      }
    }
    
    return 'main ingredient';
  }
}

export const foodApiService = new FoodApiService(); 
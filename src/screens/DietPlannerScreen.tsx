import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, GRADIENTS } from '../styles/theme';
import { useCart } from '../hooks/useCart';
import { useFoodData } from '../hooks/useFoodData';
import { FoodItem } from '../services/foodService';
import { BlurContainer } from '../components/BlurContainer';
import { useRecentMeals } from '../hooks/useRecentMeals';
import { DietPlannerHeader } from '../components/DietPlannerHeader';
import { CategorySelector } from '../components/CategorySelector';
import { SearchSuggestions } from '../components/SearchSuggestions';
import { FoodItemCard } from '../components/FoodItemCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { foodApiService } from '../services/foodApiService';
import { RootStackParamList } from '../types/navigation';
import { BackButton } from '../components/BackButton';
import { responsive } from '../utils/dimensions';
import { LAYOUT } from '../constants/layout';

const CATEGORIES = ['RECENT', 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS', 'DRINKS'];
const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 5;

const DietPlannerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { addToCart } = useCart();
  const { recentMeals, addToRecent } = useRecentMeals();
  const {
    foodItems,
    loading,
    refreshing,
    error,
    onRefresh,
    searchFoodItems,
    getFoodItemsByCategory,
    loadMore,
    setLoading,
    setFoodItems,
  } = useFoodData();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('ALL');
  const [localRefreshing, setLocalRefreshing] = React.useState(false);

  const debouncedSearch = React.useCallback(
    debounce(async (text: string) => {
      if (text.length > 0) {
        try {
          setLoading(true);
          const results = await foodApiService.searchFood(text, 20);
          setFoodItems(results);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      }
    }, 500),
    []
  );

  // Load recent searches
  React.useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const addToRecentSearches = async (search: string) => {
    try {
      const updatedSearches = [
        search,
        ...recentSearches.filter((s: string) => s !== search)
      ].slice(0, MAX_RECENT_SEARCHES);
      
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const handleAddToCart = (item: FoodItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    addToRecent(item);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setShowSuggestions(text.length > 0);
    
    if (text.length >= 2) {
      debouncedSearch(text);
    }
  };

  const handleSelectSuggestion = async (item: FoodItem) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    addToRecentSearches(item.name);
    try {
      setLoading(true);
      const results = await foodApiService.searchFood(item.name, 20);
      setFoodItems(results);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecentSearch = async (search: string) => {
    setSearchQuery(search);
    setShowSuggestions(false);
    try {
      setLoading(true);
      const results = await foodApiService.searchFood(search, 20);
      setFoodItems(results);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = React.useCallback(async (category: string) => {
    try {
      setSelectedCategory(category);
      setLoading(true);
      setSearchQuery('');
      setShowSuggestions(false);

      if (category === 'ALL') {
        const results = await foodApiService.searchFood('', 20);
        setFoodItems(results);
      } else if (category === 'RECENT') {
        setFoodItems(recentMeals);
      } else {
        const results = await foodApiService.getFoodItemsByCategory(category);
        setFoodItems(results);
      }
    } catch (error) {
      console.error('Error loading category:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFoodItems, recentMeals]);

  const getDisplayedItems = () => {
    if (selectedCategory === 'RECENT') {
      return recentMeals;
    }
    
    if (searchQuery) {
      return foodItems.filter((item: FoodItem) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return foodItems.filter((item: FoodItem) => 
      selectedCategory === 'ALL' ? true : item.category === selectedCategory
    );
  };

  const renderCategoryChip = (category: string) => (
    <TouchableOpacity
      onPress={() => handleCategorySelect(category)}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipActive,
      ]}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <FoodItemCard
      item={item}
      onAddToCart={handleAddToCart}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {showSuggestions && (
        <View style={styles.suggestionsWrapper}>
          <SearchSuggestions
            suggestions={foodItems}
            recentSearches={recentSearches}
            onSelectSuggestion={handleSelectSuggestion}
            onSelectRecentSearch={handleSelectRecentSearch}
            loading={loading}
          />
        </View>
      )}

      {getDisplayedItems().length > 0 && !showSuggestions && (
        <View style={styles.suggestionContainer}>
          <BlurContainer intensity={100} style={styles.suggestionBlur}>
            <MaterialCommunityIcons 
              name="lightbulb-on" 
              size={20} 
              color={COLORS.secondary} 
            />
            <Text style={styles.suggestionText}>
              Try our protein-rich meals for better workout results!
            </Text>
          </BlurContainer>
        </View>
      )}
    </View>
  );

  const handleRefresh = React.useCallback(async () => {
    setLocalRefreshing(true);
    try {
      if (searchQuery) {
        const results = await foodApiService.searchFood(searchQuery, 20);
        setFoodItems(results);
      } else if (selectedCategory !== 'ALL') {
        const results = await foodApiService.getFoodItemsByCategory(selectedCategory);
        setFoodItems(results);
      } else {
        await loadMore(true);
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setLocalRefreshing(false);
    }
  }, [searchQuery, selectedCategory]);

  const EmptyListComponent = React.useCallback(() => {
    if (showSuggestions) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons 
          name="food-off" 
          size={50} 
          color={COLORS.textSecondary} 
        />
        <Text style={styles.emptyText}>No meals found</Text>
        <Text style={styles.emptySubtext}>
          Pull down to refresh or try a different search
        </Text>
      </View>
    );
  }, [showSuggestions]);

  const preloadImages = (items: FoodItem[]) => {
    items.forEach(item => {
      if (item.image) {
        Image.prefetch(item.image);
      }
    });
  };

  useEffect(() => {
    if (foodItems.length > 0) {
      preloadImages(foodItems);
    }
  }, [foodItems]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <DietPlannerHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />
      
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={foodItems}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: LAYOUT.safeArea.top,
    paddingBottom: LAYOUT.sizes.tabBarHeight || 0,
  },
  header: {
    height: LAYOUT.sizes.headerHeight,
    paddingHorizontal: LAYOUT.spacing.m,
  },
  listContainer: {
    paddingHorizontal: LAYOUT.spacing.m,
  },
  gridItem: {
    width: (LAYOUT.window.width - LAYOUT.spacing.m * 3) / 2,
    marginBottom: LAYOUT.spacing.m,
  },
  categoriesContainer: {
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  foodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    opacity: 0.05,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  foodInfo: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
  },
  nutritionScore: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 6,
    minWidth: 24,
    alignItems: 'center',
  },
  scoreText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nutritionText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footerRow: {
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
  loaderContainer: {
    paddingVertical: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: 300,
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  suggestionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  suggestionBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  suggestionText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  suggestionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  suggestionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  suggestionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  suggestionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  suggestionCalories: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  headerContainer: {
    zIndex: 1,
  },
  suggestionsWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: 300,
  },
  errorText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default DietPlannerScreen; 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { foodApiService } from '../services/foodApiService';
import { FoodItem } from '../services/foodService';
import { LAYOUT } from '../constants/layout';

const FoodCategoryScreen: React.FC = ({ route, navigation }: any) => {
  const { category } = route.params;
  const [foods, setFoods] = React.useState<FoodItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFoods = async () => {
      try {
        const results = await foodApiService.searchFood(category.query, 20);
        setFoods(results);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [category]);

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity 
      style={styles.foodItem}
      onPress={() => navigation.navigate('MealDetails', { meal: item })}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodCalories}>{item.calories} calories</Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={16} color={COLORS.primary} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{category.name}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading {category.name}...</Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.bottomContainer}>
        {/* Add to Cart Button */}
      </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  foodImage: {
    width: 100,
    height: 100,
  },
  foodInfo: {
    flex: 1,
    padding: 12,
  },
  foodName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  foodCalories: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: COLORS.white,
    marginLeft: 4,
    fontSize: 14,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: LAYOUT.TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: LAYOUT.TAB_BAR_HEIGHT + 70,
  },
});

export default FoodCategoryScreen; 
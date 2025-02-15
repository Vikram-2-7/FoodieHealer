import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { foodApiService } from '../services/foodApiService';
import { useCart } from '../hooks/useCart';
import { BlurContainer } from '../components/BlurContainer';
import { LAYOUT } from '../constants/layout';
import { BackButton } from '../components/BackButton';

const FoodDetailsScreen: React.FC = ({ route, navigation }: any) => {
  const { foodId } = route.params;
  const [loading, setLoading] = useState(true);
  const [foodDetails, setFoodDetails] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFoodDetails();
  }, [foodId]);

  const fetchFoodDetails = async () => {
    try {
      setLoading(true);
      const details = await foodApiService.getFoodDetails(foodId);
      setFoodDetails(details);
    } catch (error) {
      console.error('Error fetching food details:', error);
      Alert.alert(
        "Error",
        "Could not load food details. Please try again.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: foodDetails.id,
      name: foodDetails.name,
      price: calculatePrice(),
      image: foodDetails.image,
      quantity: 1, // Default quantity is 1
    });
    Alert.alert(
      "Added to Cart",
      "Item has been added to your cart",
      [{ text: "OK" }]
    );
  };

  const calculatePrice = () => {
    return Math.max(5, Math.floor(foodDetails.calories / 100));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!foodDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Could not load food details</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Image 
          source={{ uri: foodDetails.image }} 
          style={styles.image}
        />
        
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{foodDetails.name}</Text>
            <Text style={styles.price}>${calculatePrice()}</Text>
          </View>

          {/* Nutritional Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Values</Text>
            <View style={styles.nutritionGrid}>
              <NutritionItem 
                label="Calories" 
                value={`${foodDetails.calories} kcal`}
                icon="fire"
              />
              <NutritionItem 
                label="Protein" 
                value={`${foodDetails.protein}g`}
                icon="egg"
              />
              <NutritionItem 
                label="Carbs" 
                value={`${foodDetails.carbs}g`}
                icon="bread-slice"
              />
              <NutritionItem 
                label="Fat" 
                value={`${foodDetails.fat}g`}
                icon="oil"
              />
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {foodDetails.ingredients.map((ingredient: string, index: number) => (
              <Text key={index} style={styles.ingredient}>
                • {ingredient}
              </Text>
            ))}
          </View>

          {/* Recipe Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recipe</Text>
            {foodDetails.instructions.map((step: string, index: number) => (
              <View key={index} style={styles.recipeStep}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <MaterialCommunityIcons name="cart-plus" size={24} color={COLORS.white} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NutritionItem = ({ label, value, icon }: any) => (
  <View style={styles.nutritionItem}>
    <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
    <Text style={styles.nutritionLabel}>{label}</Text>
    <Text style={styles.nutritionValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  nutritionLabel: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  nutritionValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  ingredient: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 8,
  },
  recipeStep: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    textAlign: 'center',
    marginRight: 12,
    lineHeight: 24,
  },
  stepText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cartSection: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 0,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: LAYOUT.TAB_BAR_HEIGHT + 70, // Extra space for the Add to Cart button
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: LAYOUT.TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    ...SHADOWS.medium,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: COLORS.white,
    marginBottom: 16,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodDetailsScreen; 
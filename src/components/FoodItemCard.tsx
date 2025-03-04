import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { FoodItem } from '../services/foodService';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { CachedImage } from '../components/CachedImage';
import { responsive } from '../utils/dimensions';
import { MealTimeSelectorModal } from './MealTimeSelectorModal';
import { addFoodToMealTime } from '../utils/mealTimeStorage';

interface FoodItemCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
  onRemove?: (id: string) => void;
  showRemoveButton?: boolean;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onAddToCart, onRemove, showRemoveButton }) => {
  const [showMealTimeModal, setShowMealTimeModal] = React.useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (item?.id) {
      navigation.navigate('FoodDetails', { foodId: item.id });
    }
  };

  const handleAddToMealTime = async (mealTime: string) => {
    try {
      const added = await addFoodToMealTime(item, mealTime);
      if (added) {
        Alert.alert('Success', `Added to ${mealTime.toLowerCase()}`);
      } else {
        Alert.alert('Info', `Already added to ${mealTime.toLowerCase()}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add to meal time');
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <CachedImage uri={item.image} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={16} color={COLORS.secondary} />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.footer}>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.calories}>{item.calories} cal</Text>
              <Text style={styles.time}>{item.preparationTime}</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.mealTimeButton}
                onPress={() => setShowMealTimeModal(true)}
              >
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={20} 
                  color={COLORS.white} 
                />
                <Text style={styles.buttonText}>Add to Meal Time</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.addButton}
                onPress={(e) => {
                  e.stopPropagation(); // Prevent triggering the card's onPress
                  onAddToCart(item);
                }}
              >
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {showRemoveButton && (
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => onRemove?.(item.id)}
            >
              <MaterialCommunityIcons 
                name="delete" 
                size={24} 
                color={COLORS.error} 
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <MealTimeSelectorModal
        visible={showMealTimeModal}
        onClose={() => setShowMealTimeModal(false)}
        onSelectMealTime={handleAddToMealTime}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsive.width(343),
    marginHorizontal: responsive.width(16),
    borderRadius: responsive.radius.medium,
    marginBottom: responsive.height(16),
  },
  image: {
    width: '100%',
    height: responsive.height(200),
    borderTopLeftRadius: responsive.radius.medium,
    borderTopRightRadius: responsive.radius.medium,
  },
  content: {
    padding: responsive.padding.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: responsive.font(18),
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rating: {
    color: COLORS.white,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: 12,
  },
  calories: {
    color: COLORS.textSecondary,
    marginRight: 12,
  },
  time: {
    color: COLORS.textSecondary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  removeButton: {
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
}); 
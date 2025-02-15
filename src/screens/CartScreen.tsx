import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';
import { BlurContainer } from '../components/BlurContainer';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { LAYOUT } from '../constants/layout';
import { BackButton } from '../components/BackButton';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cartItems, totalAmount, updateQuantity, removeFromCart } = useCart();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <BackButton />
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons 
            name="cart-off" 
            size={64} 
            color={COLORS.textSecondary} 
          />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>
            Add some delicious meals to get started
          </Text>
        </View>
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
        {cartItems.map((item) => (
          <CartItem
            key={`${item.id}-${item.quantity}`}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </ScrollView>

      <BlurContainer style={styles.checkoutContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <View style={styles.checkoutButtonContent}>
            <MaterialCommunityIcons 
              name="cart-arrow-right" 
              size={24} 
              color={COLORS.white} 
            />
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>
          </View>
        </TouchableOpacity>
      </BlurContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: LAYOUT.TAB_BAR_HEIGHT + 140,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: LAYOUT.TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    ...SHADOWS.medium,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  totalAmount: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  checkoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CartScreen; 
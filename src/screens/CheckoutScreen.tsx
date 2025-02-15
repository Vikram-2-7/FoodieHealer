import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';
import { useCart } from '../hooks/useCart';
import { BlurContainer } from '../components/BlurContainer';

const GST_RATE = 0.18; // 18% GST
const DELIVERY_FEE = 40; // Fixed delivery fee

interface PriceBreakdown {
  subtotal: number;
  gst: number;
  deliveryFee: number;
  total: number;
}
const CheckoutScreen: React.FC = ({ navigation }: any) => {
  const { cartItems } = useCart();
  
  const calculatePrices = (): PriceBreakdown => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst + DELIVERY_FEE;
    
    return {
      subtotal,
      gst,
      deliveryFee: DELIVERY_FEE,
      total,
    };
  };

  const handlePayment = () => {
    Alert.alert(
      "Confirm Payment",
      "Would you like to proceed with the payment?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Proceed",
          onPress: () => processPayment()
        }
      ]
    );
  };

  const processPayment = () => {
    // Here you would integrate with a payment gateway
    // For now, we'll simulate a successful payment
    Alert.alert(
      "Payment Successful",
      "Your order has been placed successfully!",
      [
        {
          text: "OK", 
          onPress: () => {
            cartItems.length = 0; // Clear cart directly since clearCart() is not available
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  const prices = calculatePrices();

  return (
    <View style={styles.container}>
      <ScrollView>
        <BlurContainer style={styles.invoiceContainer}>
          <Text style={styles.title}>Order Summary</Text>
          
          {/* Items List */}
          <View style={styles.itemsContainer}>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          {/* Price Breakdown */}
          <View style={styles.breakdownContainer}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Subtotal</Text>
              <Text style={styles.breakdownValue}>
                ${prices.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>GST (18%)</Text>
              <Text style={styles.breakdownValue}>
                ${prices.gst.toFixed(2)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Delivery Fee</Text>
              <Text style={styles.breakdownValue}>
                ${prices.deliveryFee.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.breakdownRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${prices.total.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Payment Button */}
          <TouchableOpacity 
            style={styles.paymentButton}
            onPress={handlePayment}
          >
            <MaterialCommunityIcons 
              name="credit-card-outline" 
              size={24} 
              color={COLORS.white} 
            />
            <Text style={styles.paymentButtonText}>
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </BlurContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  invoiceContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  breakdownContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  breakdownValue: {
    fontSize: 14,
    color: COLORS.white,
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  paymentButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CheckoutScreen; 
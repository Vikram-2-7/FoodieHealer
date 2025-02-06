// src/screens/CartScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params || { cart: [] };
  const [items, setItems] = useState(cart);

  // Update item quantity
  const updateQuantity = (id, action) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === 'increase'
                ? (item.quantity || 1) + 1
                : Math.max(1, (item.quantity || 1) - 1),
          }
        : item
    );
    setItems(updatedItems);
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  // Calculate subtotal
  const totalCalories = items.reduce(
    (sum, item) => sum + (item.calories * (item.quantity || 1)),
    0
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Cart</Text>

      {/* Empty Cart Message */}
      {items.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty!</Text>
      ) : (
        <>
          {/* Cart Items */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  {item.type} | {item.calories} Calories
                </Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 'decrease')}
                  >
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 'increase')}
                  >
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Text style={styles.removeItem}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Subtotal */}
          <Text style={styles.subtotal}>Total Calories: {totalCalories}</Text>

          {/* Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => alert('Order placed successfully!')}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
  cartItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeItem: {
    color: '#FF6347',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 5,
  },
  subtotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
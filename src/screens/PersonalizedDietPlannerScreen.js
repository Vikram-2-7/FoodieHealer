// src/screens/PersonalizedDietPlannerScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const PersonalizedDietPlannerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [cart, setCart] = useState([]);

  // Mock food data
  const foodData = [
    { id: '1', name: 'Grilled Chicken', type: 'Non-Veg', calories: 300 },
    { id: '2', name: 'Vegan Salad', type: 'Vegan', calories: 150 },
    { id: '3', name: 'Gluten-Free Pasta', type: 'Veg', calories: 400 },
  ];

  // Search functionality
  const handleSearch = () => {
    const filtered = foodData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  // Add to cart functionality
  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalized Diet Planner</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Food Suggestions */}
      <FlatList
        data={filteredFoods.length > 0 ? filteredFoods : foodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text>{item.name}</Text>
            <Text>{item.type} | {item.calories} Calories</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.addToCart}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Cart Summary */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartButton}
      >
        <Text style={styles.cartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  foodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addToCart: {
    color: '#FF6347',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 5,
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PersonalizedDietPlannerScreen;
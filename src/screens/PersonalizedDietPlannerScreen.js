// src/screens/PersonalizedDietPlannerScreen.js
import React, { useState } from 'react';

import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


const PersonalizedDietPlannerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodResults, setFoodResults] = useState([]);

  // Fetch food data from Spoonacular API
  const searchFood = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=fec79e9cebf9472f876a33907996cc70`
      );
      const data = await response.json();
      setFoodResults(data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Personalized Diet Planner</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={searchFood} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>


      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color={colors.babyPink} />}

      {/* Food Results */}
      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Gluten-Free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Low-Calorie</Text>
        </TouchableOpacity>
      </View>

      {/* Food Suggestions */}

      <FlatList
        data={foodResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity style={styles.foodItem}>
            <Text style={styles.foodName}>{item.title}</Text>
            <Text style={styles.foodDetails}>Calories: {item.calories || 'N/A'}</Text>
          </TouchableOpacity>
        )}
      />

          <TouchableOpacity
            style={styles.foodItem}
            onPress={() => navigation.navigate('FoodDetails', { item })}
          >
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodDetails}>
              {item.type} | {item.calories} Calories
            </Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.addToCart}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* View Cart Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart', { cart })}
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
    backgroundColor: colors.lightPurple,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.darkPurple,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: colors.darkPurple,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  searchButton: {
    backgroundColor: colors.babyPink,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },


  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    fontWeight: 'bold',
  },

  foodItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkPurple,
  },
  foodName: {
    fontSize: 18,


    fontWeight: 'bold',
  },
  foodDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addToCart: {
    color: '#FF6347',

    fontWeight: 'bold',
    color: colors.darkPurple,
  },
  foodDetails: {
    fontSize: 14,
    color: colors.darkPurple,
    marginTop: 5,
  },
});

export default PersonalizedDietPlannerScreen;
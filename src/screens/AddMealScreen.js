// src/screens/AddMealScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const AddMealScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Meal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightPurple,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
});

export default AddMealScreen;
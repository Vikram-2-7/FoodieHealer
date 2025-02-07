import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

const LogMealScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Your Meal</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Food Name"
        placeholderTextColor="#666"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Calories"
        keyboardType="numeric"
        placeholderTextColor="#666"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Portion Size"
        placeholderTextColor="#666"
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Meal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightPurple,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.babyPink,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogMealScreen;
// src/screens/UserInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const UserInfoScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    preferences: '',
  });

  const handleSubmit = () => {
    // Save formData to the backend/database
    console.log('User Info Submitted:', formData);

    // Navigate to the Dashboard
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell Us About Yourself</Text>

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={formData.weight}
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={formData.height}
        onChangeText={(text) => setFormData({ ...formData, height: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Activity Level (e.g., Moderate)"
        value={formData.activityLevel}
        onChangeText={(text) => setFormData({ ...formData, activityLevel: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Goal (e.g., Weight Loss)"
        value={formData.goal}
        onChangeText={(text) => setFormData({ ...formData, goal: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Food Preferences (e.g., Vegetarian)"
        value={formData.preferences}
        onChangeText={(text) => setFormData({ ...formData, preferences: text })}
      />

      <Button title="Submit" onPress={handleSubmit} color={colors.babyPink} />
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
  input: {
    borderWidth: 1,
    borderColor: colors.darkPurple,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
});

export default UserInfoScreen;
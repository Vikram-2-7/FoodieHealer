// src/screens/UserInfoScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoScreen = ({ navigation }) => {
  const [fitnessDetails, setFitnessDetails] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [dietDetails, setDietDetails] = useState('');

  const handleSubmit = async () => {
    // Save user details (you can send this data to your ML model API here)
    await AsyncStorage.setItem('userDetails', JSON.stringify({ fitnessDetails, foodPreferences, dietDetails }));
    navigation.navigate('MainApp'); // Navigate to the main app
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput
        placeholder="Fitness Details"
        value={fitnessDetails}
        onChangeText={setFitnessDetails}
        style={styles.input}
      />
      <TextInput
        placeholder="Food Preferences"
        value={foodPreferences}
        onChangeText={setFoodPreferences}
        style={styles.input}
      />
      <TextInput
        placeholder="Diet Details"
        value={dietDetails}
        onChangeText={setDietDetails}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} color="#6A1B9A" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A1B9A',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
});

export default UserInfoScreen;
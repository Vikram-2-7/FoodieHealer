// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity, // Add this import
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Simulate login validation
    if (email === 'user@example.com' && password === 'password') {
      // Save login status to AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');

      // Navigate to the Main App Tabs
      navigation.navigate('MainApp');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} color="#6A1B9A" />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 15,
    color: '#6A1B9A',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
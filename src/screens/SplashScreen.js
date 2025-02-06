// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a delay for initialization
    setTimeout(() => {
      navigation.replace('Auth'); // Navigate to Auth stack after splash
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Health & Fitness App</Text>
      <ActivityIndicator size="large" color={colors.babyPink} />
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
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 20,
  },
});

export default SplashScreen;
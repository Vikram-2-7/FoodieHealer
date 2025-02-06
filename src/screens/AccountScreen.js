// src/screens/AccountScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      {/* Add content here */}
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
});

export default AccountScreen;
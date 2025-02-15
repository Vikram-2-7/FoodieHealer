import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CartProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </CartProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 
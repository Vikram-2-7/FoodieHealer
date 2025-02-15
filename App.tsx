import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { SplashScreen } from './src/components/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CartProvider>
          <StatusBar style="light" />
          {isLoading ? (
            <SplashScreen onLoadingComplete={() => setIsLoading(false)} />
          ) : (
            <AppNavigator />
          )}
        </CartProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 
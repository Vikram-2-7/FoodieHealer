import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../styles/theme';

const MealSuggestionsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Text style={{ color: COLORS.white }}>Meal Suggestions Screen</Text>
    </View>
  );
};

export default MealSuggestionsScreen; 
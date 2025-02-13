import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../styles/theme';

const NutritionGoalsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Text style={{ color: COLORS.white }}>Nutrition Goals Screen</Text>
    </View>
  );
};

export default NutritionGoalsScreen; 
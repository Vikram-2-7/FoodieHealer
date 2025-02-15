import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../styles/theme';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onPress, 
  color = COLORS.white,
  size = 28
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <MaterialCommunityIcons 
        name="arrow-left" 
        size={size} 
        color={color} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
}); 
import { Platform } from 'react-native';

export const COLORS = {
  primary: '#8B5CF6',
  secondary: '#F472B6',
  accent: '#7C3AED',
  background: '#1F1F1F',
  white: '#FFFFFF',
  text: '#FFFFFF',
  textSecondary: '#E5E5E5',
  gradientStart: '#8B5CF6',
  gradientEnd: '#7C3AED',
  error: '#EF4444',
  success: '#10B981',
};

export const GRADIENTS = {
  primary: ['#8B5CF6', '#7C3AED'],
  secondary: ['#F472B6', '#EC4899'],
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }
} as const; 
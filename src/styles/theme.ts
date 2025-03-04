import { Platform } from 'react-native';

export const COLORS = {
  background: '#000000',
  primary: '#FFD700', // Main gold
  primaryLight: 'rgba(255, 215, 0, 0.15)',
  primaryDark: 'rgba(255, 215, 0, 0.05)',
  primaryBorder: 'rgba(255, 215, 0, 0.2)',
  secondary: '#FFA500', // Orange gold
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  success: 'rgba(255, 215, 0, 0.3)',
  error: '#FF4444',
  cardBackground: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  white: '#FFFFFF', // Add this for backward compatibility
};

export const GRADIENTS = {
  background: ['#1A1A1A', '#000000'],
  primary: ['#FF6B6B', '#FF8E53'],
  primary: [
    'rgba(0, 0, 0, 0.9)',
    'rgba(25, 25, 25, 1)',
    'rgba(0, 0, 0, 0.9)',
  ] as const,
  card: [
    'rgba(255, 215, 0, 0.1)',
    'rgba(255, 165, 0, 0.05)',
  ] as const,
  button: [
    '#FFD700',
    '#FFA500',
  ] as const,
  header: [
    'rgba(0, 0, 0, 0.9)',
    'rgba(25, 25, 25, 1)',
    'rgba(0, 0, 0, 0.9)',
  ] as const,
  login: [
    'rgba(0, 0, 0, 0.95)',
    'rgba(25, 25, 25, 0.97)',
  ] as const,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  light: {  // Add this for backward compatibility
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

export const ANIMATIONS = {
  scale: {
    pressed: {
      scale: 0.95,
      tension: 40,
      friction: 3,
    },
    spring: {
      scale: 1,
      tension: 40,
      friction: 3,
    },
  },
  fade: {
    duration: 300,
  },
  slide: {
    tension: 30,
    friction: 8,
  },
} as const; 
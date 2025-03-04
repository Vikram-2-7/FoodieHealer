import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Default safe area values
const DEFAULT_SAFE_AREA = {
  top: Platform.OS === 'ios' ? 44 : 24,
  bottom: Platform.OS === 'ios' ? 34 : 24,
};

export const LAYOUT = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  
  // Dynamic spacing
  spacing: {
    xs: Math.round(width * 0.01),  // 1% of screen width
    s: Math.round(width * 0.02),   // 2% of screen width
    m: Math.round(width * 0.04),   // 4% of screen width
    l: Math.round(width * 0.06),   // 6% of screen width
    xl: Math.round(width * 0.08),  // 8% of screen width
    xxl: Math.round(width * 0.1),  // 10% of screen width
  },

  // Dynamic sizes
  sizes: {
    headerHeight: Math.round(height * 0.08),  // 8% of screen height
    tabBarHeight: Platform.OS === 'ios' ? 85 : 60,
    cardWidth: Math.round(width * 0.85),      // 85% of screen width
    imageHeight: Math.round(width * 0.6),     // 60% of screen width
  },

  // Safe area values that are always defined
  safeArea: {
    ...DEFAULT_SAFE_AREA,
    horizontal: 16,
  },

  // Add TAB_BAR_HEIGHT here
  TAB_BAR_HEIGHT: Platform.OS === 'ios' ? 85 : 60,
  BOTTOM_SPACING: Platform.OS === 'ios' ? 20 : 5,
} as const; 
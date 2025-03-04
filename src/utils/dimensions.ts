import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;
const scale = Math.min(widthScale, heightScale);

export const responsive = {
  width: (w: number) => Math.round(PixelRatio.roundToNearestPixel(w * scale)),
  height: (h: number) => Math.round(PixelRatio.roundToNearestPixel(h * scale)),
  font: (f: number) => Math.round(PixelRatio.roundToNearestPixel(f * scale)),
  
  padding: {
    small: Math.round(8 * scale),
    medium: Math.round(16 * scale),
    large: Math.round(24 * scale),
  },
  
  radius: {
    small: Math.round(4 * scale),
    medium: Math.round(8 * scale),
    large: Math.round(12 * scale),
  },

  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  // Safe area insets for notched devices
  safeArea: Platform.select({
    ios: {
      top: 44,
      bottom: 34,
    },
    android: {
      top: 24,
      bottom: 24,
    },
  }),

  isSmallDevice: SCREEN_WIDTH < 375,
} as const; 
import { Platform } from 'react-native';

export const LAYOUT = {
  TAB_BAR_HEIGHT: Platform.OS === 'ios' ? 85 : 60,
  BOTTOM_SPACING: Platform.OS === 'ios' ? 20 : 5,
}; 
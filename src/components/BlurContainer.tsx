import * as React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface BlurContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  [key: string]: any;
}

export const BlurContainer = React.forwardRef<View, BlurContainerProps>(({ 
  children, 
  style,
  intensity = 100,
  ...props 
}, ref) => {
  if (Platform.OS === 'web') {
    return (
      <View 
        ref={ref}
        style={[
          style,
          { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView 
      ref={ref}
      intensity={intensity} 
      style={style}
      {...props}
    >
      {children}
    </BlurView>
  );
});

// Add display name for debugging
BlurContainer.displayName = 'BlurContainer'; 
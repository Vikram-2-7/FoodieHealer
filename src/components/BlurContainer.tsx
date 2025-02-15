import * as React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface BlurContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  [key: string]: any;
}

export const BlurContainer: React.FC<BlurContainerProps> = ({ 
  children, 
  style,
  intensity = 100,
  ...props 
}) => {
  if (Platform.OS === 'web') {
    return (
      <View 
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
      intensity={intensity} 
      style={style}
      {...props}
    >
      {children}
    </BlurView>
  );
}; 
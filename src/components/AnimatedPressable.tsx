import React from 'react';
import { 
  Animated, 
  Pressable, 
  StyleSheet, 
  ViewStyle, 
  PressableProps 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ANIMATIONS, GRADIENTS } from '../styles/theme';

interface AnimatedPressableProps extends PressableProps {
  style?: ViewStyle;
  gradient?: boolean;
  gradientColors?: string[];
  children: React.ReactNode;
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  style,
  gradient,
  gradientColors,
  children,
  ...props
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      ...ANIMATIONS.scale.pressed,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      ...ANIMATIONS.scale.spring,
      useNativeDriver: true,
    }).start();
  };

  const content = (
    <Animated.View style={[
      styles.container,
      style,
      { transform: [{ scale: scaleAnim }] }
    ]}>
      {gradient ? (
        <LinearGradient
          colors={gradientColors as [string, string] || GRADIENTS.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {children}
        </LinearGradient>
      ) : children}
    </Animated.View>
  );

  return (
    <Pressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 12,
  },
}); 
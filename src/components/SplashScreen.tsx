import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadingComplete }) => {
  const letters = "FoodieHealer".split("");
  const letterAnimations = letters.map(() => new Animated.Value(0));
  
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const spinAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Spin animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Main animation sequence
    const mainAnimation = Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Letters animation
      Animated.stagger(50, letterAnimations.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        })
      )),
      // Subtitle animation
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);

    mainAnimation.start(() => {
      setTimeout(onLoadingComplete, 800);
    });

    return () => {
      mainAnimation.stop();
    };
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          '#1a1a1a',
          '#000000',
          '#1a1a1a',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background Circles */}
        <Animated.View style={[styles.backgroundCircle, styles.circle1, {
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
        }]} />
        <Animated.View style={[styles.backgroundCircle, styles.circle2, {
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
        }]} />

        {/* Icon Container */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                { scale: scaleAnim },
                { rotate: spin }
              ],
              opacity: fadeAnim,
            },
          ]}
        >
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.iconGradient}
          >
            <Animated.View style={[styles.iconGlow, { opacity: glowAnim }]} />
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={40}
              color="#000"
            />
          </LinearGradient>
        </Animated.View>

        {/* Title Container with enhanced styling */}
        <View style={styles.titleWrapper}>
          <View style={styles.titleContainer}>
            {letters.map((letter, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.titleLetter,
                  {
                    transform: [
                      {
                        scale: letterAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                      {
                        translateY: letterAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                    opacity: letterAnimations[index],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* Subtitle with gradient background */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.1)']}
            style={styles.subtitleGradient}
          >
            <Text style={styles.subtitle}>
              Your Personal Nutrition Guide
            </Text>
          </LinearGradient>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 300,
  },
  circle1: {
    width: 600,
    height: 600,
    backgroundColor: 'rgba(255, 215, 0, 0.03)',
    top: -100,
    right: -100,
  },
  circle2: {
    width: 500,
    height: 500,
    backgroundColor: 'rgba(255, 165, 0, 0.03)',
    bottom: -50,
    left: -50,
  },
  iconContainer: {
    marginBottom: 50,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconGlow: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    borderRadius: 60,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  titleWrapper: {
    overflow: 'hidden',
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  titleLetter: {
    fontSize: 44,
    fontWeight: '800',
    color: '#FFD700',
    marginHorizontal: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitleContainer: {
    overflow: 'hidden',
    borderRadius: 25,
  },
  subtitleGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
});
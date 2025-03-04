import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert(
        'Success',
        'Registration successful!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to MainApp (Dashboard)
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started!</Text>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputContainer, SHADOWS.small]}>
            <MaterialCommunityIcons 
              name="email-outline" 
              size={24} 
              color={COLORS.primary} 
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer, SHADOWS.small]}>
            <MaterialCommunityIcons 
              name="lock-outline" 
              size={24} 
              color={COLORS.primary} 
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={[styles.inputContainer, SHADOWS.small]}>
            <MaterialCommunityIcons 
              name="lock-outline" 
              size={24} 
              color={COLORS.primary} 
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.registerButton, SHADOWS.medium]}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={GRADIENTS.button || ['#FFD700', '#FFA500']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Registering...' : 'Register'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginTextBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: COLORS.white,
    fontSize: 16,
  },
  registerButton: {
    marginTop: 24,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  loginTextBold: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen; 
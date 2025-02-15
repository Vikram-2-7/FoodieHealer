import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/theme';

const ProfileScreen = ({ navigation }) => {
  const userStats = {
    workoutsCompleted: 45,
    totalMinutes: 1250,
    caloriesBurned: 12400,
    streakDays: 7,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/profile-placeholder.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Stats cards */}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="account" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Edit Profile</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
        {/* More menu items */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... styles
});

export default ProfileScreen; 
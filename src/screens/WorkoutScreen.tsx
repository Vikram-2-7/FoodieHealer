import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';
import { BlurContainer } from '../components/BlurContainer';
import { CachedImage } from '../components/CachedImage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Temporary workout thumbnails
const WORKOUT_THUMBNAILS = [
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
  'https://images.unsplash.com/photo-1576678927484-cc907957088c',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
  'https://images.unsplash.com/photo-1579126038374-6064e9370f0f',
];

// Add this after WORKOUT_THUMBNAILS constant
const CLASSIC_WORKOUTS = [
  {
    id: '1',
    title: 'Abs',
    level: 'Beginner',
    duration: '18 mins',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
  },
  {
    id: '2',
    title: 'Chest',
    level: 'Beginner',
    duration: '7 mins',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
  },
  {
    id: '3',
    title: 'Arm',
    level: 'Beginner',
    duration: '16 mins',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
  },
  {
    id: '4',
    title: 'Leg',
    level: 'Beginner',
    duration: '22 mins',
    image: 'https://images.unsplash.com/photo-1579126038374-6064e9370f0f',
  },
  {
    id: '5',
    title: 'Shoulder & Back',
    level: 'Beginner',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1567598508481-65a7a5553b0d',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutMain'>;

const WorkoutScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Home Workout</Text>
      <View style={styles.headerRight}>
        <MaterialCommunityIcons name="fire" size={24} color="#FF6B6B" />
        <Text style={styles.streakCount}>0</Text>
        <Text style={styles.streakText}>/2</Text>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons name="magnify" size={24} color={COLORS.textSecondary} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search workouts, plans..."
        placeholderTextColor={COLORS.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const renderRecentSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BlurContainer style={styles.recentWorkoutCard}>
          <Text style={styles.planType}>CLASSIC PLAN</Text>
          <Text style={styles.workoutTitle}>Massive{'\n'}Upper Body</Text>
          <View style={styles.workoutMeta}>
            <Text style={styles.workoutDay}>Day 3</Text>
            <Text style={styles.workoutDate}>Aug 12</Text>
          </View>
          <View style={styles.thumbnailGrid}>
            {WORKOUT_THUMBNAILS.map((uri, i) => (
              <CachedImage
                key={i}
                uri={uri}
                style={styles.thumbnail}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </BlurContainer>
      </ScrollView>
    </View>
  );

  const renderClassicPlan = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Classic Plan</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.planCard}
          onPress={() => navigation.navigate('WorkoutPlan', {
            title: 'MASSIVE UPPER BODY',
            progress: 18,
            currentDay: 5,
            totalDays: 28,
            weekProgress: [
              { week: 1, completed: 6, total: 7 },
              { week: 2, completed: 0, total: 7 },
              { week: 3, completed: 0, total: 7 },
              { week: 4, completed: 0, total: 7 },
            ],
          })}
        >
          <Text style={styles.planLabel}>7×4 PLAN</Text>
          <Text style={styles.planTitle}>MASSIVE UPPER BODY</Text>
          <Text style={styles.planDay}>DAY 6</Text>
          <Text style={styles.planProgress}>5 / 28 Days Finished</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '18%' }]} />
          </View>
          <Text style={styles.progressPercent}>18%</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderClassicWorkouts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Classic Workouts</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.difficultyTabs}
      >
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.difficultyTab,
              selectedLevel === level && styles.selectedDifficultyTab
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <MaterialCommunityIcons 
              name="menu" 
              size={20} 
              color={selectedLevel === level ? COLORS.white : COLORS.textSecondary} 
            />
            <Text style={[
              styles.difficultyText,
              selectedLevel === level && styles.selectedDifficultyText
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.workoutList}>
        {CLASSIC_WORKOUTS.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutItem}
            onPress={() => navigation.navigate('WorkoutDetails', { workout })}
          >
            <CachedImage
              uri={workout.image}
              style={styles.workoutImage}
            />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>
                {workout.title} · {workout.level}
              </Text>
              <Text style={styles.workoutDuration}>
                {workout.duration}
              </Text>
            </View>
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={24} 
              color={COLORS.textSecondary} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderRecentSection()}
        {renderClassicPlan()}
        {renderClassicWorkouts()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streakCount: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakText: {
    color: COLORS.textSecondary,
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  seeAll: {
    fontSize: 16,
    color: '#007AFF',
  },
  recentWorkoutCard: {
    width: 300,
    padding: 20,
    marginLeft: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
  },
  planType: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 12,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  workoutDay: {
    color: COLORS.white,
    fontSize: 16,
  },
  workoutDate: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  thumbnailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  continueButton: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  planCard: {
    width: 300,
    height: 400,
    marginLeft: 16,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    padding: 20,
  },
  planLabel: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  planDay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  planProgress: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  progressPercent: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'flex-end',
  },
  difficultyTabs: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  difficultyTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
    gap: 8,
  },
  selectedDifficultyTab: {
    backgroundColor: COLORS.primary,
  },
  difficultyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  selectedDifficultyText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  workoutList: {
    paddingHorizontal: 16,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 4,
  },
  workoutDuration: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default WorkoutScreen; 
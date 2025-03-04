import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';
import { BlurContainer } from '../components/BlurContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutPlan'>;

const WorkoutPlanScreen: React.FC<Props> = ({ navigation, route }) => {
  const { title, progress, currentDay, totalDays } = route.params;

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.infoButton}>
        <MaterialCommunityIcons name="information" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton}>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );

  const renderWeekProgress = (weekNumber: number, isActive: boolean, progress: string) => (
    <View style={styles.weekContainer}>
      <View style={[styles.weekIcon, isActive && styles.activeWeekIcon]}>
        <MaterialCommunityIcons 
          name="lightning-bolt" 
          size={24} 
          color={isActive ? COLORS.white : '#666'} 
        />
      </View>
      <Text style={styles.weekText}>WEEK {weekNumber}</Text>
      <Text style={styles.weekProgress}>{progress}</Text>
      <View style={styles.daysGrid}>
        {Array(8).fill(null).map((_, index) => {
          const isCompleted = index < 5;
          const isCurrent = index === 5;
          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.dayButton,
                isCompleted && styles.completedDay,
                isCurrent && styles.currentDay,
              ]}
            >
              {isCompleted ? (
                <MaterialCommunityIcons name="check" size={20} color={COLORS.white} />
              ) : (
                <Text style={styles.dayNumber}>
                  {index === 7 ? '🏆' : (index + 1)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      {isActive && (
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
      >
        <BlurContainer style={styles.overlay}>
          {renderHeader()}
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentDay} / {totalDays} Days Finished
            </Text>
            <Text style={styles.progressPercent}>{progress}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          <ScrollView style={styles.content}>
            {renderWeekProgress(1, true, '6/7')}
            {renderWeekProgress(2, false, '0/7')}
            {renderWeekProgress(3, false, '0/7')}
            {renderWeekProgress(4, false, '0/7')}
          </ScrollView>
        </BlurContainer>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  infoButton: {
    position: 'absolute',
    right: 60,
    top: 48,
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.white,
    padding: 16,
  },
  progressContainer: {
    padding: 16,
    marginBottom: 20,
  },
  progressText: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 4,
  },
  progressPercent: {
    color: COLORS.white,
    fontSize: 16,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  weekContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  weekIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeWeekIcon: {
    backgroundColor: '#007AFF',
  },
  weekText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  weekProgress: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  dayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedDay: {
    backgroundColor: '#007AFF',
  },
  currentDay: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  dayNumber: {
    color: COLORS.white,
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutPlanScreen; 
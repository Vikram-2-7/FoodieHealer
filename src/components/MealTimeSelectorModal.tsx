import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { BlurContainer } from './BlurContainer';
import { COLORS, SHADOWS } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MealTimeSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMealTime: (mealTime: string) => void;
}

export const MealTimeSelectorModal: React.FC<MealTimeSelectorModalProps> = ({
  visible,
  onClose,
  onSelectMealTime,
}) => {
  const mealTimes = [
    { id: 'BREAKFAST', title: 'Breakfast', icon: 'weather-sunny' },
    { id: 'LUNCH', title: 'Lunch', icon: 'weather-partly-cloudy' },
    { id: 'DINNER', title: 'Dinner', icon: 'weather-night' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <BlurContainer style={styles.modalContent}>
              <Text style={styles.title}>Add to Meal Time</Text>
              
              {mealTimes.map((mealTime) => (
                <TouchableOpacity
                  key={mealTime.id}
                  style={styles.mealTimeButton}
                  onPress={() => {
                    onSelectMealTime(mealTime.id);
                    onClose();
                  }}
                >
                  <MaterialCommunityIcons 
                    name={mealTime.icon as any}
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.mealTimeText}>{mealTime.title}</Text>
                </TouchableOpacity>
              ))}
            </BlurContainer>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    ...SHADOWS.large,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  mealTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  mealTimeText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 12,
  },
}); 
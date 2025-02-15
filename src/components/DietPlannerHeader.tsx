import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';
import { BlurContainer } from './BlurContainer';

interface DietPlannerHeaderProps {
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  onFilterPress?: () => void;
}

export const DietPlannerHeader: React.FC<DietPlannerHeaderProps> = ({
  searchQuery = '',
  onSearchChange = () => {},
  onFilterPress = () => {},
}) => {
  return (
    <BlurContainer style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons 
          name="magnify" 
          size={24} 
          color={COLORS.textSecondary} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals, dishes..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
      
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <MaterialCommunityIcons 
          name="filter-variant" 
          size={24} 
          color={COLORS.white} 
        />
      </TouchableOpacity>
    </BlurContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
    height: '100%',
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
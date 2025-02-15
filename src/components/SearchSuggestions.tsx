import * as React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';
import { FoodItem } from '../services/foodService';

interface SearchSuggestionsProps {
  suggestions: FoodItem[];
  recentSearches: string[];
  onSelectSuggestion: (item: FoodItem) => void;
  onSelectRecentSearch: (search: string) => void;
  loading?: boolean;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  recentSearches,
  onSelectSuggestion,
  onSelectRecentSearch,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() => onSelectRecentSearch(search)}
            >
              <MaterialCommunityIcons 
                name="history" 
                size={20} 
                color={COLORS.textSecondary} 
              />
              <Text style={styles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Live Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Searching for meals...</Text>
          </View>
        ) : suggestions.length > 0 ? (
          suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.suggestionItem}
              onPress={() => onSelectSuggestion(item)}
            >
              <Image source={{ uri: item.image }} style={styles.suggestionImage} />
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionTitle}>{item.name}</Text>
                <Text style={styles.suggestionCategory}>{item.category}</Text>
              </View>
              <View style={styles.suggestionMeta}>
                <Text style={styles.suggestionPrice}>${item.price}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons 
                    name="star" 
                    size={14} 
                    color={COLORS.secondary} 
                  />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No meals found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    maxHeight: 400,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recentText: {
    color: COLORS.white,
    marginLeft: 12,
    fontSize: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  suggestionImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  suggestionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  suggestionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  suggestionCategory: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  suggestionMeta: {
    alignItems: 'flex-end',
  },
  suggestionPrice: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  rating: {
    color: COLORS.white,
    marginLeft: 4,
    fontSize: 14,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: 16,
  },
  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});

const additionalStyles = StyleSheet.create({
  noResults: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
}); 
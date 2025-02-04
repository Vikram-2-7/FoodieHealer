// src/screens/MealSuggestionsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealSuggestionsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Meal Suggestions</Text>
            {/* Add your content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MealSuggestionsScreen;

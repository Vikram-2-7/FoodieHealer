// src/screens/MealSuggestionsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '../components/Card';

const meals = [
    { id: '1', title: 'Grilled Chicken Salad', description: 'Healthy salad with grilled chicken.' },
    { id: '2', title: 'Vegan Buddha Bowl', description: 'A mix of grains and vegetables.' },
    { id: '3', title: 'Pasta Primavera', description: 'Pasta with fresh vegetables.' },
];

const MealSuggestionsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meal Suggestions</Text>
            <FlatList
                data={meals}
                renderItem={({ item }) => (
                    <Card title={item.title} description={item.description} />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default MealSuggestionsScreen;

// src/screens/ExerciseRecommendationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '../components/Card';

const exercises = [
    { id: '1', title: 'Yoga', description: 'Improve flexibility and relaxation.' },
    { id: '2', title: 'Running', description: 'Enhance endurance and cardiovascular health.' },
    { id: '3', title: 'Strength Training', description: 'Build muscle and strength.' },
];

const ExerciseRecommendationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise Recommendations</Text>
            <FlatList
                data={exercises}
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

export default ExerciseRecommendationsScreen;

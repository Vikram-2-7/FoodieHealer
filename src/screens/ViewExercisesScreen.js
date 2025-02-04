// src/screens/ViewExercisesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const exercises = [
    { id: '1', name: 'Push Up', description: 'A basic upper body exercise that targets the chest, shoulders, and triceps.' },
    { id: '2', name: 'Squat', description: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.' },
    { id: '3', name: 'Deadlift', description: 'A compound exercise that works multiple muscle groups including the back and legs.' },
    { id: '4', name: 'Bench Press', description: 'An upper body exercise that primarily targets the chest and triceps.' },
    { id: '5', name: 'Plank', description: 'A core stability exercise that engages multiple muscle groups.' },
    // Add more exercises as needed
];

const ViewExercisesScreen = ({ navigation }) => {
    const renderExerciseItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.exerciseItem} 
            onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: item.id })}
        >
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercises</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderExerciseItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    exerciseItem: {
        backgroundColor: '#32CD32', // Fitness-related green color
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        elevation: 5,
    },
    exerciseName: {
        fontSize: 18,
        color: '#fff',
    },
    exerciseDescription: {
        fontSize: 14,
        color: '#fff',
    },
});

export default ViewExercisesScreen;

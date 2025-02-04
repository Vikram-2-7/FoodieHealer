// src/screens/TrackWorkoutScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const TrackWorkoutScreen = () => {
    const [exercise, setExercise] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [workoutHistory, setWorkoutHistory] = useState([]);

    const handleAddSet = () => {
        if (exercise && weight && reps) {
            const newSet = {
                id: Math.random().toString(), // Unique ID for each set
                exercise,
                weight,
                reps,
            };
            setWorkoutHistory([...workoutHistory, newSet]);
            // Clear inputs after adding
            setExercise('');
            setWeight('');
            setReps('');
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Track Your Workout</Text>
            
            <TextInput
                placeholder="Exercise"
                style={styles.input}
                value={exercise}
                onChangeText={setExercise}
            />
            <TextInput
                placeholder="Weight (kg)"
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Repetitions"
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
            />
            
            <Button title="Add Set" onPress={handleAddSet} />

            <FlatList
                data={workoutHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.setItem}>
                        <Text style={styles.setText}>{item.exercise}: {item.weight}kg x {item.reps} reps</Text>
                    </View>
                )}
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
    input: {
        borderWidth: 1,
        borderColor: '#32CD32', // Fitness-related green color
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 50,
    },
    setItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    setText: {
        fontSize: 16,
    },
});

export default TrackWorkoutScreen;

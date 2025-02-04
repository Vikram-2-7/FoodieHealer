// src/screens/FitnessGoalsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const FitnessGoalsScreen = () => {
    const [goal, setGoal] = useState('');
    const [goalsList, setGoalsList] = useState([]);

    const handleAddGoal = () => {
        if (goal) {
            const newGoal = {
                id: Math.random().toString(), // Unique ID for each goal
                title: goal,
            };
            setGoalsList((prevGoals) => [...prevGoals, newGoal]);
            setGoal(''); // Clear input after adding
        } else {
            alert('Please enter a goal.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fitness Goals</Text>
            
            <TextInput
                placeholder="Enter your fitness goal"
                style={styles.input}
                value={goal}
                onChangeText={setGoal}
            />
            
            <Button title="Add Goal" onPress={handleAddGoal} />

            <FlatList
                data={goalsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.goalItem}>
                        <Text style={styles.goalText}>{item.title}</Text>
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
    goalItem: {
        backgroundColor: '#32CD32', // Fitness-related green color
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
    },
    goalText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default FitnessGoalsScreen;

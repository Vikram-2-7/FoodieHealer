// src/screens/FitnessScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FitnessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fitness Section</Text>

            <View style={styles.menuContainer}>
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('TrackWorkout')}
                >
                    <Text style={styles.menuText}>Track Workout</Text>
                    <Text style={styles.menuDescription}>Log your workouts and progress.</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('ViewExercises')}
                >
                    <Text style={styles.menuText}>View Exercises</Text>
                    <Text style={styles.menuDescription}>Browse a list of exercises.</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => navigation.navigate('FitnessGoals')}
                >
                    <Text style={styles.menuText}>Fitness Goals</Text>
                    <Text style={styles.menuDescription}>Set and track your fitness goals.</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuContainer: {
        width: '90%',
    },
    menuItem: {
        backgroundColor: '#32CD32', // Fitness-related green color
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        elevation: 5,
    },
    menuText: {
        fontSize: 18,
        color: '#fff',
    },
    menuDescription: {
        fontSize: 14,
        color: '#fff',
    },
});

export default FitnessScreen;
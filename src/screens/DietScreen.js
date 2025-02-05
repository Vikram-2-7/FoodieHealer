// src/screens/DietScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const DietScreen = () => {
    const [meal, setMeal] = useState('');
    const [calories, setCalories] = useState('');
    const [dietLog, setDietLog] = useState([]);

    const handleAddMeal = () => {
        if (meal && calories) {
            const newMeal = {
                id: Math.random().toString(), // Unique ID for each meal
                name: meal,
                calorieCount: calories,
            };
            setDietLog((prevLog) => [...prevLog, newMeal]);
            // Clear inputs after adding
            setMeal('');
            setCalories('');
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Diet Tracker</Text>
            
            <TextInput
                placeholder="Meal Name"
                style={styles.input}
                value={meal}
                onChangeText={setMeal}
            />
            <TextInput
                placeholder="Calories"
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
            />
            
            <Button title="Add Meal" onPress={handleAddMeal} />

            <FlatList
                data={dietLog}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.mealItem}>
                        <Text style={styles.mealText}>{item.name}: {item.calorieCount} kcal</Text>
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
        borderColor: '#6A5ACD', // Fitness-related green color
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 50,
    },
    mealItem: {
        backgroundColor: '#6A5ACD', // Fitness-related green color
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
    },
    mealText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default DietScreen;
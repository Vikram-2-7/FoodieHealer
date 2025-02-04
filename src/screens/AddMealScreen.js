// src/screens/AddMealScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddMealScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Meal Section</Text>
            {/* Implement add meal functionality here */}
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
    },
});

export default AddMealScreen;
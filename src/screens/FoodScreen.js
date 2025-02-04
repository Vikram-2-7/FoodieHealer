// src/screens/FoodScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Food Section</Text>
            {/* Implement food-related functionality here */}
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

export default FoodScreen;
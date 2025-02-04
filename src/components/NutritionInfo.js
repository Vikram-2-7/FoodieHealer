// src/components/NutritionInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutritionInfo = ({ nutritionData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nutritional Information</Text>
            {nutritionData.map((item) => (
                <View key={item.label} style={styles.row}>
                    <Text style={styles.label}>{item.label}:</Text>
                    <Text>{item.value}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    label: {
        fontWeight: '600',
    },
});

export default NutritionInfo;

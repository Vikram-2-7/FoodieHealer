// src/screens/ProgressScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Progress Screen</Text>
            {/* Add your content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProgressScreen;

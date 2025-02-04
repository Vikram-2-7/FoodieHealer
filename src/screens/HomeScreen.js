// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="My App" />
            <Text style={styles.title}>Welcome to My App!</Text>
            <Button title="Get Started" onPress={() => navigation.navigate('ExerciseRecommendations')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
    },
});

export default HomeScreen;

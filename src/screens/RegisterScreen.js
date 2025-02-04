// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        if (email && password && confirmPassword) {
            if (password === confirmPassword) {
                // Save user credentials to AsyncStorage
                try {
                    await AsyncStorage.setItem('userCredentials', JSON.stringify({ email, password }));
                    console.log('User registered:', { email, password });
                    navigation.navigate('Dashboard'); // Navigate to Dashboard on successful registration
                } catch (error) {
                    console.error('Error saving data', error);
                }
                setErrorMessage(''); // Clear error message on successful registration
            } else {
                setErrorMessage("Passwords don't match.");
            }
        } else {
            setErrorMessage('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5ACD', // Purple theme color
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 50,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
    },
});

export default RegisterScreen;
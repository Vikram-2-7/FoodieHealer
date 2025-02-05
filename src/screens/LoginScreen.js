import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        // Mock login logic (no Firebase)
        if (email === "test@example.com" && password === "password") {
            console.log('User logged in successfully');
            navigation.navigate('Dashboard'); // Navigate to Dashboard Screen
        } else {
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.register}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#E6E6FA', // Light Purple
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6A5ACD', // Dark Purple
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#6A5ACD', // Dark Purple
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 50,
        backgroundColor: '#FFFFFF', // White
    },
    forgot: {
        color: '#6A5ACD', // Dark Purple
        marginBottom: 20,
    },
    register: {
        color: '#6A5ACD', // Dark Purple
        marginTop: 15,
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
});

export default LoginScreen;
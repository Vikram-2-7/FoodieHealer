// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Check if user credentials are already stored
        const checkCredentials = async () => {
            const savedCredentials = await AsyncStorage.getItem('userCredentials');
            if (savedCredentials) {
                const { email, password } = JSON.parse(savedCredentials);
                setEmail(email);
                setPassword(password);
            }
        };
        checkCredentials();
    }, []);

    const handleLogin = async () => {
        const savedCredentials = await AsyncStorage.getItem('userCredentials');
        
        if (savedCredentials) {
            const { email: savedEmail, password: savedPassword } = JSON.parse(savedCredentials);
            
            if (email === savedEmail && password === savedPassword) {
                console.log('Logged in successfully:', { email });
                navigation.navigate('Dashboard'); // Navigate to Dashboard on successful login
                setErrorMessage(''); // Clear error message on successful login
            } else {
                setErrorMessage('Invalid email or password.');
            }
        } else {
            setErrorMessage('No user found. Please register first.');
        }
    };

    return (
        <View style={styles.container}>
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
    forgot: {
        color: '#fff',
        marginBottom: 20,
    },
    register: {
        color: '#fff',
        marginTop: 15,
        textAlign: 'center',
    },
    error: {
       color:'red' ,
   }
});

export default LoginScreen;

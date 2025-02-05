import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // New state for username
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        // Mock registration logic (no Firebase)
        if (email && password && username) {
            console.log('User registered successfully');
            // Navigate to Dashboard Screen and pass username as a parameter
            navigation.navigate('Dashboard', { username }); // Pass username
        } else {
            setErrorMessage('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            {/* Username Input */}
            <TextInput
                placeholder="Username"
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />

            {/* Email Input */}
            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />

            {/* Password Input */}
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />

            {/* Register Button */}
            <Button title="Register" onPress={handleRegister} />

            {/* Login Link */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.login}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '80%',
        backgroundColor: '#FFFFFF', // White
    },
    login: {
        color: '#6A5ACD', // Dark Purple
        marginTop: 15,
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
});

export default RegisterScreen;
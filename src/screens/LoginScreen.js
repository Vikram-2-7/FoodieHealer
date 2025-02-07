// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../services/api'; // Import the loginUser function

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Validate input fields
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all required fields!');
      return;
    }

    try {
      // Call the backend API to log in the user
      const token = await loginUser(email, password);

      // Save the JWT token in AsyncStorage
      await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Login successful');
      navigation.navigate('MainApp'); // Navigate to the main app screen after successful login
    } catch (error) {
      // Handle errors from the backend
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} color="#6A1B9A" />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A1B9A',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  link: {
    marginTop: 15,
    color: '#6A1B9A',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;









// // src/screens/LoginScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     if (email === 'user@example.com' && password === 'password') {
//       await AsyncStorage.setItem('isLoggedIn', 'true');
//       navigation.navigate('UserInfo'); // Navigate to user info page
//     } else {
//       Alert.alert('Error', 'Invalid email or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin} color="#6A1B9A" />
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.link}>Don't have an account? Register here</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F3E5F5',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#6A1B9A',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#6A1B9A',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//   },
//   link: {
//     marginTop: 15,
//     color: '#6A1B9A',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginScreen;
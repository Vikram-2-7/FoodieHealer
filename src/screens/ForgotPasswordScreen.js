// src/screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ForgotPasswordScreen = () => {
   const [email, setEmail] = useState('');

   const handleResetPassword = () => {
      // Implement your reset password logic here
      console.log(`Reset password for email:${email}`);
   };

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Reset Password</Text>
           <TextInput 
               placeholder="Enter your email" 
               value={email} 
               onChangeText={(text) => setEmail(text)} 
               style={styles.input} 
           />
           <Button title="Send Reset Link" onPress={handleResetPassword} />
       </View>
   );
};

const styles = StyleSheet.create({
   container:{
       flex :1 ,
       justifyContent :'center' ,
       alignItems :'center' ,
       backgroundColor:'#6A5ACD', // Purple theme color
   },
   title:{
       fontSize :24 ,
       marginBottom :20 ,
       color:'#fff'
   },
   input:{
       height :50 ,
       borderColor :'#fff' ,
       borderWidth :1 ,
       borderRadius :10 ,
       paddingHorizontal :10 ,
       marginBottom :20 ,
       width :'80%' ,
   }
});

export default ForgotPasswordScreen;
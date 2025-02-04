// src/screens/MealLogScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const MealLogScreen = () => {
   const [mealName, setMealName] = React.useState('');

   const handleLogMeal = () => {
      // Logic to log the meal (e.g., API call)
      console.log(`Meal logged:${mealName}`);
      setMealName(''); // Clear input after logging
   };

   return (
       <View style={styles.container}>
           <TextInput 
               placeholder="Enter meal name" 
               value={mealName} 
               onChangeText={setMealName} 
               style={styles.input} 
           />
           <Button title="Log Meal" onPress={handleLogMeal} color={colors.accent} />
       </View>
   );
};

const styles = StyleSheet.create({
   container:{
       flex :1 ,
       paddingHorizontal :20 ,
       paddingTop :40 ,
       backgroundColor:'#F5F5F5',
   },
   input:{
       height :50 ,
       borderColor :colors.border , // Use a color defined in your colors.js file
       borderWidth :1 ,
       borderRadius :5 ,
       paddingHorizontal :10 ,
       marginVertical :10 ,
   }
});

export default MealLogScreen;

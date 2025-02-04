// src/screens/RecipeDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NutritionInfo from '../components/NutritionInfo'; // Assuming you have this component

const RecipeDetailScreen = ({ route }) => {
   const { recipe } = route.params; // Assume recipe is passed as a parameter

   return (
       <View style={styles.container}>
           <Text style={styles.title}>{recipe.name}</Text>
           <Text style={styles.instructions}>{recipe.instructions}</Text>
           <NutritionInfo nutritionData={recipe.nutrition} /> {/* Pass nutritional data */}
           {/* Add functionality to save or share the recipe */}
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
   title:{
       fontSize :24 ,
       fontWeight :'bold' ,
   },
   instructions:{
       marginVertical :10 ,
       fontSize :16 ,
   }
});

export default RecipeDetailScreen;

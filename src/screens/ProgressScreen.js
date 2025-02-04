// src/screens/ProgressScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressChart from '../components/ProgressChart'; // Assuming you have this component

const ProgressScreen = () => {
   const data = {
       labels: ['Week 1', 'Week 2', 'Week 3'], // Example labels
       values: [60, 55, 50], // Example weight values or other metrics
   };

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Progress Tracking</Text>
           <ProgressChart data={data} />
           {/* Add more progress metrics as needed */}
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
       marginBottom :20 ,
   }
});

export default ProgressScreen;

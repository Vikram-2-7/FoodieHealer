// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const SettingsScreen = () => {
   const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

   const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Settings</Text>
           <View style={styles.settingRow}>
               <Text>Enable Notifications</Text>
               <Switch 
                   onValueChange={toggleSwitch} 
                   value={notificationsEnabled} 
               />
           </View>
           {/* Add more settings options as needed */}
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
   },
   settingRow:{
       flexDirection :'row' ,
       justifyContent :'space-between' ,
       alignItems :'center' ,
       marginVertical :10 ,
   }
});

export default SettingsScreen;

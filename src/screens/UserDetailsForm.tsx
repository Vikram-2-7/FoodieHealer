import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserDetailsForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    dietaryPreferences: '',
    foodAllergies: '',
    favoriteFood: '',
    workoutFrequency: '',
  });

  const handleSubmit = () => {
    // Process form data
    navigation.navigate('MainApp');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(text) => setFormData({...formData, age: text})}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={formData.height}
            onChangeText={(text) => setFormData({...formData, height: text})}
          />

          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Weight (kg)"
            keyboardType="numeric"
            value={formData.weight}
            onChangeText={(text) => setFormData({...formData, weight: text})}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Activity Level</Text>
          <Picker
            selectedValue={formData.activityLevel}
            onValueChange={(value) => 
              setFormData({...formData, activityLevel: value})
            }>
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Lightly Active" value="light" />
            <Picker.Item label="Moderately Active" value="moderate" />
            <Picker.Item label="Very Active" value="very" />
          </Picker>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Diet Preferences</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Dietary Preferences (e.g., vegetarian, vegan)"
          value={formData.dietaryPreferences}
          onChangeText={(text) => 
            setFormData({...formData, dietaryPreferences: text})
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Food Allergies"
          value={formData.foodAllergies}
          onChangeText={(text) => 
            setFormData({...formData, foodAllergies: text})
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Favorite Foods"
          value={formData.favoriteFood}
          onChangeText={(text) => 
            setFormData({...formData, favoriteFood: text})
          }
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Complete Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetailsForm; 
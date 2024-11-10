import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  ScrollView 
} from 'react-native';
import { useNavigate } from 'react-router-native';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: 'Vaiditya',
    lastName: 'Tanwar',
    email: 'vaiditya2207@gmail.com',
    phoneNumber: ' 92562 25327',
    height: '5"11',
    weight: '85'
  });

    const navigate = useNavigate();
    
  const handleSave = () => {
    console.log('Saving changes:', formData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.profileImage}
        />
      </View>

      {/* Contact Details Section */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Details</Text>
        
        {/* Name Fields */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => setFormData({...formData, firstName: text})}
              placeholder="First Name"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => setFormData({...formData, lastName: text})}
              placeholder="Last Name"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Your Contact Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Your Emergency Contact</Text>
            <TextInput
              style={styles.input}
              value="8317034424"
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Your Height</Text>
            <TextInput
              style={styles.input}
              value={formData.height}
              onChangeText={(text) => setFormData({...formData, height: text})}
              placeholder="Your height"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Your Weight</Text>
            <TextInput
              style={styles.input}
              value={formData.weight}
              onChangeText={(text) => setFormData({...formData, weight: text})}
              placeholder="Your weight"
            />
          </View>
        </View>
        

        {/* Additional Fields */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 0,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#fff',
  },
  formContainer: {
    padding: 20,
    borderWidth: 1,           // Border for form container
    borderColor: '#ddd',      // Light grey border
    borderRadius: 12,         // Optional: Rounds the corners
    backgroundColor: '#fff',
    margin: 20  // White background for the form
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
    fontWeight: 'semibold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#0b6781',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
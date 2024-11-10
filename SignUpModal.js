import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    email: '',
    phone: '',
    emergencyPhone: '',
  });
  const [errors, setErrors] = useState({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const numberRegex = /^\d+(\.\d{1,2})?$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!phoneRegex.test(formData.emergencyPhone)) newErrors.emergencyPhone = 'Invalid phone number';
    if (!numberRegex.test(formData.weight)) newErrors.weight = 'Invalid weight';
    if (!numberRegex.test(formData.height)) newErrors.height = 'Invalid height';
    if (!privacyAccepted) newErrors.privacy = 'Please accept privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        "Success!",
        "You have successfully joined a wonderful community of care.",
        [{ text: "OK", onPress: () => navigate('/') }]
      );
    }
  };

  const inputStyle = (field) => ({
    ...styles.input,
    borderColor: errors[field] ? '#FF0000' : '#E0E0E0',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Join the Waiting List</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            style={inputStyle('firstName')}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({...formData, firstName: text})}
            placeholderTextColor="#666"
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            style={inputStyle('lastName')}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({...formData, lastName: text})}
            placeholderTextColor="#666"
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <TextInput
            style={inputStyle('weight')}
            placeholder="Weight (lbs)"
            value={formData.weight}
            onChangeText={(text) => setFormData({...formData, weight: text})}
            keyboardType="decimal-pad"
            placeholderTextColor="#666"
          />
          {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}

          <TextInput
            style={inputStyle('height')}
            placeholder="Height (in)"
            value={formData.height}
            onChangeText={(text) => setFormData({...formData, height: text})}
            keyboardType="decimal-pad"
            placeholderTextColor="#666"
          />
          {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}

          <TextInput
            style={inputStyle('email')}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={inputStyle('phone')}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <TextInput
            style={inputStyle('emergencyPhone')}
            placeholder="Emergency Contact Number"
            value={formData.emergencyPhone}
            onChangeText={(text) => setFormData({...formData, emergencyPhone: text})}
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />
          {errors.emergencyPhone && <Text style={styles.errorText}>{errors.emergencyPhone}</Text>}

          <TouchableOpacity 
            style={styles.privacyContainer}
            onPress={() => setPrivacyAccepted(!privacyAccepted)}
          >
            <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
              {privacyAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.privacyText}>I agree to the terms of the Privacy Policy</Text>
          </TouchableOpacity>
          {errors.privacy && <Text style={styles.errorText}>{errors.privacy}</Text>}

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  privacyText: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignupScreen;
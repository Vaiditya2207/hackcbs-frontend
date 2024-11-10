import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigate } from 'react-router-native';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  // State management for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const navigate = useNavigate();

  // Form validation function
  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !phoneNumber || !height || !weight) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  // Handle sign up with validation and API call
  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('https://hackcbs-backend-x9gw.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          first_name: firstName,
          last_name: lastName,
          weight: parseFloat(weight),
          height: parseFloat(height),
          email: email,
          password: password
        })
      });
      
      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success', 
          'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigate('/signin')
            }
          ]
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Error', 'An error occurred during sign up');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1608963600486-c2df3ba0597e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Welcome to Heal Ora</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>FIRST NAME</Text>
                  <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>LAST NAME</Text>
                  <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>PASSWORD</Text>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>PHONE NUMBER</Text>
                  <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter your phone number"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>HEIGHT</Text>
                  <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="Enter your height in cm"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>WEIGHT</Text>
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Enter your weight in kg"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                  />
                </View>

                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={handleSignUp}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signUpText}>SIGN UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={() => navigate('/sign-in')}
                >
                  <Text style={styles.loginLinkText}>
                    Already have an account? Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: width * 0.05,
    paddingTop: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerContainer: {
    marginBottom: height * 0.03,
    alignItems: 'left',
  },
  title: {
    fontSize: Math.min(width * 0.07, 80),
    fontWeight: '600',
    color: 'white',
    textAlign: 'left',
  },
  formContainer: {
    width: '100%',
    maxWidth: Math.min(400, width * 0.9),
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  label: {
    color: 'white',
    fontSize: Math.min(width * 0.035, 16),
    marginBottom: height * 0.01,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: Math.min(width * 0.035, 16),
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: 20,
    minHeight: Math.max(height * 0.05, 40),
  },
  signUpButton: {
    backgroundColor: '#197996',
    paddingVertical: Math.max(height * 0.02, 12),
    borderRadius: 25,
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpText: {
    color: 'white',
    fontSize: Math.min(width * 0.035, 16),
    textAlign: 'center',
    fontWeight: '600',
  },
  loginLink: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  loginLinkText: {
    color: 'white',
    fontSize: Math.min(width * 0.035, 14),
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
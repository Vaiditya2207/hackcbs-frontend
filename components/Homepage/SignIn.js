import React, { useState, useCallback } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const SignInScreen = ({ setIsLoggedIn, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    return true;
  }, [email, password]);

  const handleNavigateToSignUp = useCallback(() => {
    navigate('/sign-up');
  }, [navigate]);

  const handleNavigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleSignIn = useCallback(async () => {
    if (loading) return;
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await fetch('https://hackcbs-backend-x9gw.onrender.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });
      
      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setToken(data.token);
        
        // Navigate immediately without Alert
        handleNavigateToHome();
      } else {
        const errorMessage = data.message || 'Invalid email or password';
        Alert.alert('Sign In Failed', errorMessage);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert(
        'Connection Error',
        'Unable to connect to the server. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [loading, validateForm, email, password, setIsLoggedIn, setToken, handleNavigateToHome]);

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
                <Text style={styles.title}>Welcome back to Heal Ora</Text>
              </View>

              <View style={styles.formContainer}>
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
                    editable={!loading}
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
                    editable={!loading}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.signUpButton, loading && styles.disabledButton]}
                  onPress={handleSignIn}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text style={styles.signUpText}>
                    {loading ? 'Signing in...' : 'SIGN IN'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={handleNavigateToSignUp}
                  disabled={loading}
                >
                  <Text style={styles.loginLinkText}>
                    Don't have an account? Sign Up
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

export default SignInScreen;
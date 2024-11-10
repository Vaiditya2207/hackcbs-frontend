import { StatusBar } from 'expo-status-bar';
import { Routes, Route, Navigate } from 'react-router-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeroSection from './components/Homepage/Heropage';
import ResponsiveImageGrid from './components/Homepage/Changing';
import ChatFeature from './components/Homepage/chatFeature'; // Ensure this path is correct
import Footer from './components/Homepage/Footer';
import AiAssistant from './components/Homepage/SeparateChat';
import ProfilePage from './components/Homepage/Profile';
import SignUpScreen from './components/Homepage/Signup';
import SignInScreen from './components/Homepage/SignIn';
import Layout from './components/Layout';
import { NativeRouter } from 'react-router-native';
import Logout from './components/Homepage/Logout'; // Import the Logout component

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Add back button handler for Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Add custom back button logic if needed
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // Check for token in AsyncStorage when app loads
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Checking stored token:', storedToken);
        
        if (storedToken) {
          console.log('Found stored token, setting logged in state');
          setIsLoggedIn(true);
          setToken(storedToken);
        } else {
          console.log('No token found in storage');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, []);

  console.log('App render state:', { isLoggedIn, token });

  return (
    <SafeAreaView style={styles.container}>
      <NativeRouter>
        <StatusBar style="auto" />
        <Routes>
          {/* Specific routes */}
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} setToken={setToken} />}
          />
          <Route 
            path="/ai-assistant" 
            element={<AiAssistant isLoggedIn={isLoggedIn} token={token} />} 
          />
          <Route 
            path="/sign-up" 
            element={<SignUpScreen setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} 
          />
          <Route 
            path="/sign-in" 
            element={<SignInScreen setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} 
          />
          <Route 
            path="/my-profile" 
            element={<ProfilePage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} 
          />
          {/* Place the root route last without 'exact' */}
          <Route path="/" element={
            <Layout>
              <HeroSection isLoggedIn={isLoggedIn} token={token} />
              <ResponsiveImageGrid />
              <ChatFeature />
              <Footer />
            </Layout>
          } />
        </Routes>
      </NativeRouter>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

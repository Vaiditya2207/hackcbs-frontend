
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ setIsLoggedIn, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
        setToken(null);
        navigate('/sign-in'); // Redirect to sign-in page
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Logout;
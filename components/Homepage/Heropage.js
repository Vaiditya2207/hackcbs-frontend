import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = (props) => {
  const navigate = useNavigate();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            });
          },
          error => {
            console.log('Geolocation error:', error);
            resolve({ longitude: null, latitude: null });
          }
        );
      } else {
        console.log('Geolocation not supported');
        resolve({ longitude: null, latitude: null });
      }
    });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

   const findNearestHospitals = async () => {
     const { longitude, latitude } = await getUserLocation();
     console.log(latitude, longitude)
    try {
      const response = await fetch('https://hackcbs-backend-x9gw.onrender.com/api/hospitals/nearest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          longitude: latitude,
          latitude: longitude,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching nearest hospitals:', error);
    }
};

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      minHeight: windowHeight,
      width: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      zIndex: 1,
      marginTop: windowWidth <= 768 ? 100 : 0,
    },
    header: {
      marginTop: 20,
      flexDirection: windowWidth <= 768 ? 'column' : 'row',
      justifyContent: windowWidth <= 768 ? 'flex-start' : 'space-between',
      alignItems: 'left',
      position: 'absolute',
      top: 0,
      left: 20,
      right: 20,
      zIndex: 2,
    },
    buttonContainer: {
      flexDirection: windowWidth <= 768 ? 'column' : 'row',
      alignItems: 'flex-start',
      marginTop: windowWidth <= 768 ? 5 : 0,
      width: windowWidth <= 768 ? '100%' : 'auto',
      marginBottom: windowWidth <= 768 ? 80 : 0,
    },
    joinButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      marginLeft: windowWidth <= 768 ? 0 : 10,
      marginTop: windowWidth <= 768 ? 10 : 0,
      width: windowWidth <= 768 ? '80%' : 'auto',
    },
    joinText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'left',
    },
    logo: {
      color: 'white',
      fontSize: 32,
      fontWeight: '600',
      textAlign: 'left',
      marginBottom: windowWidth <= 768 ? 5 : 0,
    },
    title: {
      color: 'white',
      fontSize: windowWidth <= 768 ? 36 : 48,
      fontWeight: 'bold',
      marginBottom: 5,
      maxWidth: windowWidth <= 768 ? '100%' : '80%',
    },
    subtitle: {
      color: 'white',
      fontSize: 18,
      marginTop: 20,
      maxWidth: windowWidth <= 768 ? '100%' : '60%',
      lineHeight: 28,
      marginBottom: 30,
    },
    waitlistButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      alignSelf: 'flex-start',
    },
    waitlistText: {
      color: 'white',
      fontSize: 18,
      marginRight: 10,
      marginBottom: 5,
    },
    arrow: {
      color: 'white',
      fontSize: 20,
    },
    hover: {
      cursor: 'pointer',
    },
    navLinks: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 100,
    },
    link: {
      padding: 10,
    },
    linkText: {
      color: 'white',
      fontSize: 18,
      textDecorationLine: 'underline',
    },
  });

  return (
    <ImageBackground
      source={{ uri: 'https://static.tildacdn.net/tild6337-3062-4135-a162-636635303331/Sol_Health_final_ver.jpg' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      
      <View style={styles.header}>
        <Text style={styles.logo}>Heal Ora</Text>

        <View style={styles.buttonContainer}>
          {props.isLoggedIn ? (<TouchableOpacity 
              style={styles.joinButton}
              onPress={findNearestHospitals}
            >
              <Text style={styles.joinText}>
                {props.isLoggedIn ? 'Emergency Hospitals near me' : ''}
              </Text>
            </TouchableOpacity>): null}
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => handleNavigation(props.isLoggedIn ? '/ai-assistant' : '/sign-in')}
          >
            <Text style={styles.joinText}>
              {props.isLoggedIn ? 'Chat' : 'Join'}
            </Text>
          </TouchableOpacity>

          {props.isLoggedIn ? (<TouchableOpacity 
            style={styles.joinButton}
            onPress={() => handleNavigation(props.isLoggedIn ? '/logout' : '/sign-up')}
          >
            <Text style={styles.joinText}>
              {props.isLoggedIn ? 'Log Out' : 'Join'}
            </Text>
          </TouchableOpacity>): null}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.title}>Redefining</Text>
          <Text style={styles.title}>Your Healthcare</Text>
          <Text style={styles.title}>Journey</Text>
          <Text style={styles.subtitle}>
            Heal Ora - your comprehensive health chat buddy that tracks your symptoms, provides probable medicines, and delivers personalized care, all powered by advanced AI to keep you healthier, longer.
          </Text>
          
          <TouchableOpacity 
            style={styles.waitlistButton}
            onPress={() => handleNavigation('/sign-up')}
          >
            <Text style={styles.waitlistText}>Join the community</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default HeroSection;
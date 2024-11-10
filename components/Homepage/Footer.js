import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'react-router-native';

const Footer = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.95)).current;

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const scrollAnimation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]);

    scrollAnimation.start();
  }, []);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 30,
      paddingBottom: 20,
      width: '100%',
      zIndex: 1,
    },
    content: {
      flexDirection: screenWidth < 768 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: screenWidth < 768 ? 'center' : 'flex-start',
    },
    logo: {
      fontSize: screenWidth < 768 ? 80 : 400,  // Larger on small screens
      fontWeight: '600',
      color: '#000',
      textAlign: 'center',
    },
    tagline: {
      fontSize: screenWidth < 768 ? 12 : 20,  // Slightly larger on small screens
      color: '#666',
      fontWeight: 'semibold',
      textAlign: 'right',  // Center tagline on small screens
    },
    contactInfo: {
      marginBottom: screenWidth < 768 ? 10 : 0,
      marginTop: screenWidth < 768 ? 20 : 0,
    },
    contactText: {
      fontSize: screenWidth < 768 ? 16 : 18,
      textAlign: screenWidth < 350 ? 'center' : 'left',
      alignItems: screenWidth < 768 ? 'center' : 'left',
      color: '#333',
      marginBottom: 8,
    },
    address: {
      fontSize: screenWidth < 768 ? 16 : 18,
      color: '#333',
      marginTop: 16,
      paddingBottom: 10,
      textAlign: 'left',
    },
    links: {
      alignItems: screenWidth < 768 ? 'left' : 'left',
      marginTop: screenWidth < 768 ? 20 : 0,
    },
    link: {
      color: '#000',
      textDecorationLine: 'underline',
      marginBottom: 12,
      // textAlign: 'left',
    },
    linkText: {
      fontSize: screenWidth < 768 ? 16 : 18,
    },
    copyright: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center', // Center the copyright text
      marginTop: 20, // Adjust top margin for spacing
    },
    development: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      fontSize: 14,
      color: '#666',
    },
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>

        <Animated.View 
          style={[
            styles.links,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.linkText}>
          ©2024 Sol Health
          </Text>
        </Animated.View>

        {/* Contact Information */}
        <Animated.View 
          style={[
            styles.contactInfo,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity onPress={() => handleLinkPress('tel:+919256225327')}>
            <Text style={styles.contactText}>+91 92562 25327</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('mailto:vaiditya.t23csai@nst.rishihood.edu.in')}>
            <Text style={styles.contactText}>Vaiditya Tanwar</Text>
          </TouchableOpacity>
          <Text style={styles.address}>
            NH44, Chowk, Bahalgarh{'\n'}
            Rishihood University
          </Text>
        </Animated.View>

        {/* Links */}
        <Animated.View 
          style={[
            styles.links,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Link to="/privacy" component={TouchableOpacity} style={styles.link}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Link>
          <Link to="/terms" component={TouchableOpacity} style={styles.link}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </Link>
          <Link to="/cookies" component={TouchableOpacity} style={styles.link}>
            <Text style={styles.linkText}>Cookie Policy</Text>
          </Link>
        </Animated.View>
      </View>

      {/* Logo Section */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScaleAnim }],
          },
        ]}
      >
        <Text style={styles.logo}>Heal Ora</Text>
        <Text style={styles.tagline}>Welcome to the future of personalized care.</Text>
      </Animated.View>

      {/* Bottom Text */}
    </Animated.View>
  );
};

export default Footer;

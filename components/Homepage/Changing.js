import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const ResponsiveImageGrid = () => {
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth <= 768;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 20,
      paddingTop: 100,
      paddingBottom: 20,
      width: '100%',
    },
    textContainer: {
      width: '100%',
      marginBottom: 30,
    },
    mainText: {
      fontSize: isMobile ? 40 : 60,
      fontWeight: 'semibold',
      color: '#000',
      textAlign: 'center',
      paddingHorizontal: isMobile ? 10 : 0,
    },
    imageContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      width: '100%',
    },
    largeImage: {
      flex: isMobile ? 0 : 2,
      height: isMobile ? windowWidth * 0.5 : windowWidth * 0.405,
      width: isMobile ? '100%' : undefined,
      borderRadius: 15,
      marginRight: isMobile ? 0 : 10,
      marginTop: isMobile ? 5 : 0,
    },
    smallImagesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: 10,
    },
    smallImage: {
      width: isMobile ? '48.5%' : '100%',
      height: isMobile ? windowWidth * 0.4 : windowWidth * 0.2,
      borderRadius: 15,
    },
    smallImagesContainer: {
      flex: isMobile ? 0 : 1,
      flexDirection: isMobile ? 'column' : 'column',
      justifyContent: 'space-between',
    },
  });

  if(isMobile) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>The future of care is personalized.</Text>
        </View>
        <View style={styles.smallImagesRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.smallImage}
            resizeMode="cover"
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.smallImage}
            resizeMode="cover"
          />
        </View>
        <Image
          source={{ uri: 'https://static.tildacdn.net/tild6565-3930-4466-b832-636662393130/eye.jpg' }}
          style={styles.largeImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>The future of care is personalized.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://static.tildacdn.net/tild6565-3930-4466-b832-636662393130/eye.jpg' }}
          style={styles.largeImage}
          resizeMode="cover"
        />
        <View style={styles.smallImagesContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.smallImage}
            resizeMode="cover"
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.smallImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
};

export default ResponsiveImageGrid;
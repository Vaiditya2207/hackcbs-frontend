// components/Homepage/SuperText.js
import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, ScrollView } from 'react-native';

const FadingText = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // For main text fading out
  const fadeInAnim = useRef(new Animated.Value(0)).current; // For "We're changing that" fading in
  const { height: windowHeight } = Dimensions.get('window');

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const fadeStartPosition = windowHeight * 0.2;
    const fadeEndPosition = contentHeight - windowHeight * 1.2; // Adjust to start fade-out near the end

    // Main text fade-out
    if (scrollPosition > fadeStartPosition) {
      const fadeAmount = Math.max(
        0,
        1 - (scrollPosition - fadeStartPosition) / (fadeEndPosition - fadeStartPosition)
      );
      fadeAnim.setValue(fadeAmount);
    } else {
      fadeAnim.setValue(1);
    }

    // "We're changing that" fade-in
    if (scrollPosition > fadeEndPosition - 100) { // Adjust threshold for fade-in timing
      const fadeInAmount = Math.min(
        1,
        (scrollPosition - (fadeEndPosition - 100)) / 100
      );
      fadeInAnim.setValue(fadeInAmount);
    } else {
      fadeInAnim.setValue(0);
    }
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={styles.contentContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.titleText}>The future of care is personalized.</Text>
        <Text style={styles.regularText}>
          Your health is as unique as you are,{'\n'}
          shaped by your individual patterns,{'\n'}
          environment, genetics, and more. Yet, with all this information, the way{'\n'}
          we care for our health remains as{'\n'}
          complex as ever.
        </Text>
      </Animated.View>
      <Animated.View style={[styles.fadeInTextContainer, { opacity: fadeInAnim }]}>
        <Text style={styles.fadeInText}>We’re changing that.</Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    marginTop: 80,
    marginBottom: 80, // Remove spacer and use marginBottom for scroll padding
    maxWidth: 1200,
    alignSelf: 'center',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 76.8, // 1.2 line height multiplier
    color: '#000',
    fontFamily: 'System', // You might want to replace with your specific font
  },
  regularText: {
    fontSize: 64,
    fontWeight: 'normal',
    lineHeight: 76.8,
    color: '#000',
    fontFamily: 'System',
  },
  fadeInTextContainer: {
    position: 'absolute',
    bottom: 20, // Position this above the bottom for visibility
    alignSelf: 'center',
  },
  fadeInText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'System',
  },
});

export default FadingText;

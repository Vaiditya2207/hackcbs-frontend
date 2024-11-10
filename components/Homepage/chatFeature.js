import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import { Link, useNavigate } from 'react-router-native'; // If Link is used, ensure it's from 'react-router-native'

const ChatFeature = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const lines = [
    "How can I help you today?",
    "What health concerns are you facing?",
    "I feel sore today. What's the best cooldown exercise I can do?",
    "Can you find the best dish for me in my cold?",
    "Ask me anything about your health.",
  ];

  const handleInputChange = (text) => {
    setQuery(text);
  };

  const handleInputFocus = () => {
    navigate('/ai-assistant');
  };

  useEffect(() => {
    const typingDuration = lines[currentTextIndex].length * 100; // time to type out the full line (100ms per character)
    const waitForLineDisplay = 2000; // time to wait after line is fully typed before switching to the next one

    const timeout = setTimeout(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, typingDuration + waitForLineDisplay);

    return () => clearTimeout(timeout); // Clear timeout when switching lines
  }, [currentTextIndex]);

  useEffect(() => {
    let timeouts = [];
    const currentLine = lines[currentTextIndex];
    setPlaceholder(""); // Reset placeholder for fresh typing effect

    // Typing effect for each line
    currentLine.split("").forEach((char, idx) => {
      const timeout = setTimeout(() => {
        setPlaceholder((prev) => prev + char);
      }, idx * 100); // Typing speed set to 100ms per character
      timeouts.push(timeout);
    });

    return () => {
      // Clear timeouts to prevent overlap between lines
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [currentTextIndex]);

  const windowWidth = Dimensions.get('window').width; // Get the screen width

  // Set a dynamic font size based on the screen width
  const dynamicFontSize = windowWidth < 350 ? 30 : windowWidth < 600 ? 30 : 45;
  const dynamicHeight = windowWidth < 350 ? 20 : windowWidth < 600 ? 45 : 70;

  return (
    <View style={styles.container}>
      <Text style={[styles.queryText, { fontSize: dynamicFontSize, marginBottom: dynamicHeight / 2 }]}>
        Ask Your Health-Bot Anything
      </Text>
      <TextInput
        style={[styles.inputBox, { height: dynamicHeight }]}
        placeholder={placeholder}
        placeholderTextColor="grey"
        value={query}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus} // Add this line to handle focus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
    padding: 20,
    backgroundColor: '#fff',
  },
  queryText: {
    fontFamily: 'Arial',
    color: 'black',
    textAlign: 'center',
    fontWeight: 'semibold',
  },
  inputBox: {
    width: '80%', // makes the input box responsive
    backgroundColor: 'rgba(0, 0, 0, 0.07)', // light background color
    borderRadius: 32, // rounded corners
    paddingHorizontal: 15, // horizontal padding inside the input box
    paddingLeft: 18,
    fontSize: 18, // font size of the text
    color: 'black', // text color
    marginLeft: '10%', 
    marginRight: '10%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
});

export default ChatFeature;

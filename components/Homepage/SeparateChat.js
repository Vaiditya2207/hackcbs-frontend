import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with compatible icon library
import { useNavigate } from 'react-router-native'; // Changed from 'react-router-dom' to 'react-router-native'

const AiAssistant = ({ isLoggedIn, token }) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [showIntro, setShowIntro] = useState(true); // Add this state

  // Add logging for props
  useEffect(() => {
    console.log('AiAssistant Props:', { isLoggedIn, token });
  }, [isLoggedIn, token]);

  // Modify the chat session creation
  useEffect(() => {
    console.log('Checking auth state:', { isLoggedIn, token });
    
    if (!isLoggedIn) {
      console.log('User not logged in, redirecting to /sign-up');
      navigate('/sign-up');
      return;
    }

    const createChatSession = async () => {
      console.log('Attempting to create chat session with token:', token);
      
      try {
        const response = await fetch('https://hackcbs-backend-x9gw.onrender.com/api/chat', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: "Health Check"
          })
        });

        console.log('API Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Failed response:', errorData);
          throw new Error(`Failed to create chat session: ${response.status}`);
        }

        const data = await response.json();
        console.log('Chat session created successfully:', data);
        setChatId(data.chat_id);
      } catch (error) {
        console.error('Error in createChatSession:', error);
        Alert.alert('Error', 'Failed to create chat session');
      }
    };

    console.log('Calling createChatSession...');
    createChatSession();
  }, [isLoggedIn, token, navigate]);

  // Handle close with authentication check
  const handleClose = () => {
    navigate('/');
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim() || !chatId) {
      console.log('Cannot send: empty input or no chatId', { inputText, chatId });
      return;
    }
  
    setShowIntro(false); // Hide intro when first message is sent
    setIsLoading(true);
    console.log('Sending message:', { chatId, inputText });
  
    // Retrieve user's location
    const { longitude, latitude } = await getUserLocation();
  
    try {
      // First add user message to UI
      setMessages(prev => [...prev, { text: inputText, isUser: true }]);
      
      // Send message to AI endpoint with location
      console.log('Making API request to /api/ai');
      const response = await fetch(`https://hackcbs-backend-x9gw.onrender.com/api/ai?id=${chatId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          long: longitude,
          lat: latitude
        },
        body: JSON.stringify({
          data: {
            role: "user",
            msg: inputText
          }
        })
      });

      console.log('AI API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed AI response:', errorData);
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      console.log('AI response received:', data);
      
      // Check if it's an emergency response
      if (data.message && data.message.includes('Emergency')) {
        console.log('Emergency response detected');
        // Add emergency message with hospital info
        const emergencyText = `🚨 EMERGENCY: ${data.message}\n\nNearest Hospital:\n${data.nearestHospital.hospital_name}\n${data.nearestHospital.location.address}\n(${data.nearestHospital.distance} away)`;
        setMessages(prev => [...prev, { text: emergencyText, isUser: false, isEmergency: true }]);
      } else {
        // Regular response
        setMessages(prev => [...prev, { 
          text: data.aiResponse || data.message, 
          isUser: false 
        }]);
      }
      
      setInputText('');
    } catch (error) {
      console.error('Error in AI communication:', error);
      Alert.alert('Error', 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get user's location
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

  // Handle suggestion click
  const handleSuggestionClick = async (question) => {
    setInputText(question);
    setShowIntro(false);
    // Simulate user sending the suggestion
    try {
      // First add user message to UI
      setMessages(prev => [...prev, { text: question, isUser: true }]);
      
      console.log('Sending suggestion:', { chatId, question });
      const response = await fetch(`https://hackcbs-backend-x9gw.onrender.com/api/ai?id=${chatId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            role: "user",
            msg: question,
            long: null,
            lat: null
          }
        })
      });

      // Handle response similar to handleSendMessage
      console.log('AI API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed AI response:', errorData);
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      console.log('AI response received:', data);
      
      // Check if it's an emergency response
      if (data.message && data.message.includes('Emergency')) {
        console.log('Emergency response detected');
        const emergencyText = `🚨 EMERGENCY: ${data.message}\n\nNearest Hospital:\n${data.nearestHospital.hospital_name}\n${data.nearestHospital.location == undefined ? "Cant Get the Correct Location" : `${data.nearestHospital.location}` }\n(${data.nearestHospital.distance} KMS away)\nQuick Help: ${data.details}`;
        setMessages(prev => [...prev, { text: emergencyText, isUser: false, isEmergency: true }]);
      } else {
        setMessages(prev => [...prev, { 
          text: data.aiResponse || data.message, 
          isUser: false 
        }]);
      }
      
      setInputText('');
    } catch (error) {
      console.error('Error sending suggestion:', error);
    }
  };

  // Predefined questions/buttons
  const questions = [
    'Generate Summary',
    'Are they a good fit for my job post?',
    'What is their training style?',
  ];

  const handleNavigation = (route) => {
    try {
      navigate(route);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.sparkle}>✨</Text>
              <Text style={styles.title}>Heal Ora</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeButton}>x</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {showIntro ? (
              // Show intro content only when showIntro is true
              <>
                <View style={styles.orbContainer}>
                  <Image
                    source={require('./assets/marble.png')}  // Replace with the path to your PNG image
                    style={styles.orb}
                  />
                </View>

                {/* Question Text */}
                <Text style={styles.questionText}>
                  What health query do you have? 
                </Text>

                {/* Question Buttons */}
                <View style={styles.buttonsContainer}>
                  {questions.map((question, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.questionButton}
                      onPress={() => handleSuggestionClick(question)}
                    >
                      <Text style={styles.questionButtonText}>{question}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              // Show messages when chat has started
              <ScrollView 
                style={styles.messagesContainerActive}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              >
                {messages.map((msg, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.messageBox,
                      msg.isUser ? styles.userMessage : styles.botMessage,
                      msg.isEmergency && styles.emergencyMessage
                    ]}
                  >
                    <Text style={[
                      styles.messageText,
                      msg.isUser ? styles.userMessageText : styles.botMessageText,
                      msg.isEmergency && styles.emergencyMessageText
                    ]}>
                      {msg.text}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ask me anything..."
                placeholderTextColor="#666"
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity 
                style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
                onPress={handleSendMessage}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Icon name="paper-plane" size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Add/modify these styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between', // This will push content to top and input to bottom
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 20,
    // Replace shadow* properties with boxShadow for web
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)'
    } : {
      // Keep original shadow properties for native
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }),
    padding: 16,
    position: 'relative', // For positioning the input section
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sparkle: {
    fontSize: 18,
    marginRight: 8,
    color: '#22c55e',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 80, // Add padding to prevent content from going under input
  },
  orbContainer: {
    marginVertical: 20,
  },
  orb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.9,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  questionText: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'flex-end', // Align to the right
    gap: 10,
  },
  questionButton: {
    backgroundColor: '#E6E6E6', // Light gray background for the chat message box look
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: '80%', // Limit width of the message box
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 10, // Optional: for spacing between buttons
  },
  questionButtonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  showMoreButton: {
    marginTop: 5,
  },
  showMoreText: {
    color: '#666',
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  messagesContainerActive: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20, // Add some top margin when showing messages
  },
  messageBox: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#22c55e',
    marginLeft: '20%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    marginRight: '20%',
  },
  emergencyMessage: {
    backgroundColor: '#ff4444',
    marginRight: '20%',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  botMessageText: {
    color: '#333333',
  },
  emergencyMessageText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 0, // Remove bottom margin
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#22c55e',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  link: {
    padding: 10,
  },
  linkText: {
    color: '#22c55e',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default AiAssistant;
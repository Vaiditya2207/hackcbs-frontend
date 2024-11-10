
import { ActivityIndicator } from 'react-native';
// ...existing imports...

const SignUpScreen = () => {
  // ...existing state...
  const [isLoading, setIsLoading] = useState(false);

  // ...existing code...

  // Handle sign up with validation and API call
  const handleSignUp = async () => {
    console.log('handleSignUp called');
    if (!validateForm()) return;

    setIsLoading(true); // Start loading
    try {
      console.log('Sending signup request...');
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
      console.log('Response data:', data);

      if (response.ok) {
        showAlert(
          'Success', 
          'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigate('/sign-in')
            }
          ]
        );
      } else {
        showAlert('Error', data.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      showAlert('Error', 'An error occurred during sign up');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ...existing code... */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        activeOpacity={0.8}
        disabled={isLoading} // Disable button while loading
      >
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>

      {isLoading && (
        <ActivityIndicator 
          size="large" 
          color="#ffffff" 
          style={styles.loadingIndicator} 
        />
      )}

      {/* ...existing code... */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ...existing styles...
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25, // Half of the ActivityIndicator size
    marginTop: -25,
  },
  // ...existing styles...
});
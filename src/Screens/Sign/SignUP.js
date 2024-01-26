import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Basic input validation, you can add more specific checks if needed
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Display loading spinner
    setIsLoading(true);

    // Simulate sign-up logic with a delay (replace with your actual sign-up logic)
    setTimeout(() => {
      console.log('Email:', email);
      console.log('Password:', password);
      // Add your authentication logic here

      navigation.navigate('Payment');
      // Replace 'Payment' with the actual screen name you want to navigate to
      setIsLoading(false); // Stop loading spinner
    }, 2000); // Simulated delay of 2 seconds
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Email"
        leftIcon={<Icon name="email" />}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        style={styles.input}
        placeholder="Password"
        leftIcon={<Icon name="lock" />}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View>
        <Text style={styles.txt}>OR SIGN UP WITH YOUR </Text>
      </View>
      <View style={styles.logoContainer}>
        <Text>
        {/* Add Google and Apple logos here */}
        <TouchableOpacity>
          <Icon name="google" type="font-awesome" color="red" size={60} />
        </TouchableOpacity>
        <View style={{ width: 90 }} /> {/* Add spacing between logos */}
        <TouchableOpacity>
          <Icon name="apple" type="font-awesome" color="#000" size={60} />
        </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: 160,
  },
  input: {
    flex: 1,
    marginLeft: 10, // Add space between icon and input
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 39,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Add vertical margin between input fields
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  txt: {
    marginTop: 30,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;

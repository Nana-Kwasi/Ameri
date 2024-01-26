import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChooseScreen = ({navigation}) => {
  const handleGuestPress = () => {
    navigation.navigate('Payment')
    // Handle the action for shopping as a guest
    console.log('Shopping as a guest');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUP')
  
    console.log('Sign up');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Choose your Option!</Text>
        <TouchableOpacity style={styles.button} onPress={handleGuestPress}>
          <Text style={styles.buttonText}>Shop as Guest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChooseScreen;

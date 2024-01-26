import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../BottomTab/BottomTapNavigator';


const LoginScreen = () => {
  return (
    <View style={styles.container}>

      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;

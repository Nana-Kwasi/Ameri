import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WishlistScreen from '../Health/Wishlist';
import ProfileScreen from '../Education/Profile';
import WelcomeScreen from '../Communication/Welcome';
import TrackingScreen from '../Tracking/Tracking';
// import HistoryScreen from '../Feeds/History';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Welcome') {
            iconName = 'home';
          } else if (route.name === 'Tracking') {
            iconName = 'location-on';
          } else if (route.name === 'Wishlist') {
            iconName = 'favorite';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          } 

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom:10
          // Increase label font size
        },
        tabBarIconStyle: {
          fontSize: 18,
         
         
        },
        tabBarActiveTintColor: '#D2DE32',
        tabBarInactiveTintColor: '#FFF2D8',
        tabBarStyle: {
          backgroundColor: '#001524',
          elevation: 70,
          shadowColor: 'white',
          shadowOpacity: 0.9,
          shadowRadius: 10,
            marginBottom: 5,
          borderRadius: 20,
          height:'10%'
        },
      })}
    >
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="History" component={HistoryScreen} /> Add the Feeds screen */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  // Add your custom styles here
});

export default BottomTabNavigator;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Stores = ({route}) => {
  const navigation = useNavigation();
  const { location } = route.params;




  const popularStores = [
    'Amazon', 'eBay', 'Walmart', 'Academy', 'K.mart', 'Belk', 'Best Buy', 'Overstock',
    'Bed & Bath', 'Marshall', 'Micro center', 'Old Navy', 'Ross', 'Sally beauty', 'Victoria Secret',
    'Wayfair', 'Macy\'s', 'H&M', 'Forever 21', 'Home Depot',
  ];

  const navigateToLogin = () => {
    navigation.navigate('Login');
    location
  };

  const renderStoreCard = ({ item }) => (
    <TouchableOpacity style={styles.storeCard} onPress={navigateToLogin}>
      <Text style={styles.storeName}>{item}</Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    // Log the entire location object when the component mounts
    console.log('Full Geocoding Result:', location);

    // Add any other logic you need here

    // Make sure to cleanup any resources if necessary when the component unmounts
    return () => {
      // Cleanup logic if needed
    };
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your Store you want to shop in</Text>
      <FlatList
        data={popularStores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderStoreCard}
        numColumns={2} // Set the number of columns to 2
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#001524'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginHorizontal: 55,
    marginBottom: 30,
    color:'white'
  },
  storeCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Add elevation for a card-like effect (Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  storeName: {
    fontSize: 18,
  },
});

export default Stores;

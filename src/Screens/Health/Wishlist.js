import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthScreen = ({ route }) => {
  const [favoritedProducts, setFavoritedProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedFavoritedProducts = await AsyncStorage.getItem('favoritedProducts');
        if (storedFavoritedProducts !== null) {
          setFavoritedProducts(JSON.parse(storedFavoritedProducts));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadStoredData();
  }, []); // Only run on mount

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('favoritedProducts', JSON.stringify(favoritedProducts));
      } catch (error) {
        console.error('Error storing data:', error);
      }
    };

    if (favoritedProducts.length > 0) {
      storeData();
    }
  }, [favoritedProducts]); // Run when favoritedProducts changes

  useEffect(() => {
    const routeFavoritedProducts = route.params?.favoritedProducts || [];
    const routeClickedProduct = route.params?.clickedProduct;

    if (routeFavoritedProducts.length > 0) {
      setFavoritedProducts(routeFavoritedProducts);
    }

    if (routeClickedProduct) {
      setClickedProduct(routeClickedProduct);
    }
  }, [route.params]); // Run when route.params changes

  console.log('clickedProduct:', clickedProduct);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      {clickedProduct ? (
        <Card style={styles.card}>
          {/* Display product information in the Card component */}
          <Image source={clickedProduct.imageSource} style={{ width: 340, height: 150 }} />
          <Card.Content>
            <Title style={styles.cardTitle}>{clickedProduct.name}</Title>
            <Paragraph>{clickedProduct.description}</Paragraph>
            <Paragraph>{`Price: $${clickedProduct.price.toFixed(2)}`}</Paragraph>
            {/* Add more details as needed */}
          </Card.Content>
        </Card>
      ) : (
        <Text>No product information available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white', // White background color
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HealthScreen;

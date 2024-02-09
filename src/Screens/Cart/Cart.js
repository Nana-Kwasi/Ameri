
import React, { useState,useEffect,useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch } from 'react-redux';

const CartScreen = ({  route, navigation }) => {
  const dispatch = useDispatch();

    // console.log(route,'CART');
  
    const { cartItems } = route.params || { cartItems: [] };
    const [locationName, setLocationName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      console.log('Dispatched Action:', route.params?.cartItems);
      dispatch({ type: 'SET_CART_ITEMS', payload: route.params?.cartItems || [] });
    }, [dispatch, route.params?.cartItems]);
  
    useEffect(() => {
      const loadCartItems = async () => {
        try {
          const storedCartItems = await AsyncStorage.getItem('cartItems');
          if (storedCartItems !== null && aggregatedCartItems.length === 0) {
            dispatch({ type: 'SET_CART_ITEMS', payload: JSON.parse(storedCartItems) });
          }
        } catch (error) {
          console.error('Error loading cart items:', error);
        }
      };
    
      loadCartItems();
    }, [dispatch, aggregatedCartItems]);
    


  
  useEffect(() => {
    console.log('Current State:', cartItems);
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error storing cart items:', error);
      }
    };

    storeData();
  }, [cartItems]);


    const fetchLocation = useCallback(async () => {
      try {
        const location = await Location.getCurrentPositionAsync({});
        // console.log('Current Location:', location);
  
        const geocodingResult = await reverseGeocode(location.coords);
        // console.log('Geocoding Result:', geocodingResult);
        setLocationName(geocodingResult);
  
        setIsLoading(false);
      } catch (error) {
        console.error('Error getting location:', error);
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchLocation();
  
    
      return () => {
        setLocationName(null);
        setIsLoading(true);
      };
    }, [fetchLocation]);
const reverseGeocode = async (coords) => {
      try {
        const geocoding = await Location.reverseGeocodeAsync(coords);
  
        if (geocoding && geocoding.length > 0) {
          const result = geocoding[0];
  
          // Extract relevant information from the result
          const { city, country, region, name, subregion } = result;
          const readableAddress = [city, region, country].filter(Boolean).join(', ');
  
          return {
            city: city || 'Unknown',
            country: country || 'Unknown',
            name: name || 'Unknown',
            subregion: subregion || 'Unknown',
            readableAddress: readableAddress || 'Unknown Location',
          };
        } else {
          console.log('Geocoding result is empty.');
          return {
            city: 'Unknown',
            country: 'Unknown',
            name: 'Unknown',
            subregion: 'Unknown',
            readableAddress: 'Unknown Location',
          };
        }
      } catch (error) {
        console.error('Error during geocoding:', error);
        return {
          city: 'Error',
          country: 'Error',
          name: 'Error',
          subregion: 'Error',
          readableAddress: 'Error getting location name',
        };
      }
    };
const [aggregatedCartItems, setAggregatedCartItems] = useState(() => {
    if (cartItems.length > 0) {
      const aggregatedItems = [];
      cartItems.forEach((item) => {
        const existingItem = aggregatedItems.find((aggregatedItem) => aggregatedItem.id === item.id);
        if (existingItem) {
          existingItem.count += 1;
        } else {
          aggregatedItems.push({ ...item, count: 1 });
        }
      });
      return aggregatedItems;
    }

    return [];
  });



  const total = aggregatedCartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleQuantityChange = (itemId, action) => {
    const updatedCartItems = aggregatedCartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          count: action === 'increment' ? item.count + 1 : Math.max(1, item.count - 1),
        };
      }
      return item;
    });

 
    setAggregatedCartItems(updatedCartItems);
  };

  const handleRemoveItem = (itemId) => {

    const updatedCartItems = aggregatedCartItems.filter((item) => item.id !== itemId);
    setAggregatedCartItems(updatedCartItems);
  
    // Update AsyncStorage with the modified cart items
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      .then(() => {
        // Dispatch an action to update the global state in Redux
        console.log("Dispatching REMOVE_FROM_CART action for itemId:", itemId);
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      })
      .catch((error) => {
        console.error('Error updating AsyncStorage:', error);
      });
  };
  
  
  
  

  const renderItem = ({ item }) => (
    <Card style={styles.cartItemCard}>
      <Card.Content style={{ width: 350 }}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{`${item.name} (x${item.count})`}</Text>
          <Image source={item.imageSource} style={{ width: 340, height: 150 }} />
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>{`$${(item.price * item.count).toFixed(2)}`}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrement')}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.count}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increment')}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
         
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Remove Item',
                `Are you sure you want to remove ${item.name} from your cart?`,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => handleRemoveItem(item.id),
                    style: 'destructive',
                  },
                ]
              )
            }
            style={styles.removeButtonContainer}
          >
            <View style={styles.removeButtonCircle}>
              <Text style={styles.removeButton}>X</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
  const LocationCard = ({ locationInfo }) => {
    console.log('LocationInfo:', locationInfo); // Log the locationInfo
    return (
      <Card style={styles.locationCard}>
        <Card.Content>
          <Text style={styles.locationInfo}>
            {locationInfo
              ? ` ${locationInfo.city}, ${locationInfo.country }, ${locationInfo.name }`
              : "Loading"}
          </Text>
        </Card.Content>
      </Card>
    );
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <LocationCard locationInfo={locationName} />
      {aggregatedCartItems.length > 0 ? (
        <FlatList
          data={aggregatedCartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{`Total: $${total.toFixed(2)}`}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 90,
    alignItems: 'center',
  },
  cartItemCard: {
    marginBottom: 8,
   
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemDescription: {
    color: 'gray',
    fontSize: 17,
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16,
  },
  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 8,
  },
  
  checkoutButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:20,
  },
  
  itemInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 100,
  },
  quantityButton: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: 'black',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  locationCard: {
    marginBottom: 16,
  },

  locationInfo: {
    fontSize: 16,
    color: 'brown',
  },
  totalText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 10, // Add some spacing between the total and checkout button
  },
  
  removeButtonContainer: {
    marginLeft: 90, // Push the button to the right
  },
  
  removeButtonCircle: {
    backgroundColor: 'red',
    borderRadius: 20, 
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  removeButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps)(CartScreen);


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WelcomeScreen = ({ navigation, route }) => {
  const [productData, setProductData] = useState(generateProductData());
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationExpanded, setLocationExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favoritedProducts, setFavoritedProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch or update cart items when the WelcomeScreen is in focus
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };
  
    loadCartItems();
  
    const unsubscribe = navigation.addListener('focus', () => {
      loadCartItems();
    });
  
    // Cleanup effect
    return unsubscribe;
  }, [navigation, route.params?.cartItems]);
  

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Fetch or update cart items when the WelcomeScreen is in focus
  //     setCartItems(route.params?.cartItems || []);
  //   });
  
  //   // Cleanup effect
  //   return unsubscribe;
  // }, [navigation, route.params?.cartItems]);
  






  // const handleRemoveFromCart = (productId) => {
  //   // Remove the item with the specified ID from the cart
  //   const updatedCartItems = cartItems.filter((item) => item.id !== productId);
  //   setCartItems(updatedCartItems);
  // };



  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Location Permission Status:', status);
        if (status === 'granted') {
          // Get the current location with permission granted
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location.coords);
    
          // Perform geocoding to get the location name
          const geocodingResult = await reverseGeocode(location.coords);
          setLocationName(geocodingResult);
    
          setIsLoading(false); // Set loading to false when location details are fetched
        } else {
          console.log('Location permission denied');
          setIsLoading(false); // Set loading to false in case of permission denial
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };


    const handleProductClick = (product) => {
      setSelectedProduct(product);
      setModalVisible(true);
    };
  
    fetchLocation();
  }, []);
  
  
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
  const toggleLocationExpanded = () => {
    setLocationExpanded(!isLocationExpanded);
  }

  const handleFavorite = (productId) => {
    setProductData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, favorite: !product.favorite } : product
      )
    );
  
    // Get the product that was clicked
    const clickedProduct = productData.find((product) => product.id === productId);
  
    // Include the image source in the product details
    const productWithImage = {
      ...clickedProduct,
      imageSource: images[clickedProduct.id - 1],
    };
  
    // Check if the product is already in the favoritedProducts array
    const isProductFavorited = favoritedProducts.some((product) => product.id === productId);
  
    // Update the favoritedProducts array based on the favorite status
    if (clickedProduct.favorite && !isProductFavorited) {
      setFavoritedProducts((prevFavoritedProducts) => [...prevFavoritedProducts, productWithImage]);
    } else if (!clickedProduct.favorite && isProductFavorited) {
      setFavoritedProducts((prevFavoritedProducts) =>
        prevFavoritedProducts.filter((product) => product.id !== productId)
      );
    }
  
    // Pass the entire product information to the 'History' screen
    navigation.navigate('Wishlist', { favoritedProducts,favoritedProducts, clickedProduct: productWithImage });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleSearch = () => {
    const filteredProducts = generateProductData().filter((product) =>
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setSearchResults(filteredProducts);
  
    if (filteredProducts.length === 0) {
      Alert.alert('No Results', 'No products found for the given search.');
    }
  
    setTimeout(() => {
      setSearchVisible(false);
      setSearchQuery(''); // Clear the search query
      setSearchResults([]); // Clear the search results
    }, 4000);
  };
  
  
  


  const handleAddToCart = (productId) => {
    Alert.alert('Product Added', 'The product has been added to your cart.');
    const productToAdd = productData.find((product) => product.id === productId);
  
    // Include the image source in the product details
    const productWithImage = {
      ...productToAdd,
      imageSource: images[productToAdd.id - 1],
    };
  
    setCartItems((prevItems) => [...prevItems, productWithImage]);
  
    // Update AsyncStorage with the new cart items
    AsyncStorage.setItem('cartItems', JSON.stringify([...cartItems, productWithImage]));
  };
  

  const images = [
    require('../../../assets/sho.jpg'),
    require('../../../assets/bagg.jpg'),
    require('../../../assets/head.jpg'),
    require('../../../assets/sho.jpg'),
    require('../../../assets/sho.jpg'),
  ];

  

    const renderProductCards = () => {
      const productsToRender = searchResults.length > 0 ? searchResults : productData;
    
      return productsToRender.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.cardContainer}
          onPress={() => handleProductClick(product)} // Add this onPress event
        >
          <Image source={images[product.id - 1]} style={styles.productImage} />
          <TouchableOpacity onPress={() => handleFavorite(product.id)} style={styles.favoriteButton}>
          </TouchableOpacity>
          <Text style={styles.cardText}>{product.name}</Text>
          <Text>{product.description}</Text>
          <Text>{`Price: $${product.price.toFixed(2)}`}</Text>
          <Text>{product.outOfStock ? 'Out of Stock' : 'In Stock'}</Text>
          {/* <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product.id)}>
            <Text style={{ color: 'white' }}>Add to Cart</Text>
          </TouchableOpacity> */}
        </TouchableOpacity>
      ));
    };
    

  function generateProductData() {
    const products = [];
    for (let i = 1; i <= 20; i++) {
      products.push({
        id: i,
        name: `Product ${i}`,
        description: `Description for Product ${i}`,
        price: Math.random() * (100 - 10) + 10,
        outOfStock: Math.random() < 0.2, // 20% chance of being out of stock
        favorite: false,
      });
    }
    return products;
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedContainer}>
        {/* <Image source={require('../../assets/logo1.png')} style={styles.logo} /> */}
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)} style={styles.searchIcon}>
          <Text style={{ fontSize: 30 }}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart', { cartItems })}>
          <Text style={{ fontSize: 24 }}>🛒 {cartItems.length} </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.locationIcon} onPress={toggleLocationExpanded}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 230 }}>
            <Text style={{ marginLeft: 18 }}>
              <Icon name="map-marker" size={34} color="black" />
            </Text>
            {locationName && (
              <TouchableOpacity onPress={toggleLocationExpanded} style={styles.locationTextContainer}>
                <Text style={styles.locationText}>Deliver to {locationName.country}</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {searchVisible && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for products"
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      )}

    <ScrollView contentContainerStyle={styles.cardsContainer}>
      <View style={styles.rowContainer}>
        {renderProductCards().slice(0, 2)}
      </View>
      <View style={styles.rowContainer}>
        {renderProductCards().slice(2, 4)}
      </View>
    </ScrollView>
   
  
    <Modal
  animationType="slide"
  transparent={false}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(!modalVisible)}
>
<ScrollView contentContainerStyle={styles.modalContainerScroll}>
    
    {selectedProduct && (
      <View style={styles.productDetailsContainer}>
        <Image source={images[selectedProduct.id - 1]} style={styles.productImageModal} />
        <Text style={styles.modalText}>{selectedProduct.name}</Text>
        <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
        <Text style={styles.modalPrice}>{`Price: $${selectedProduct.price.toFixed(2)}`}</Text>

        {/* Add to Cart button inside the modal */}
        <TouchableOpacity
          onPress={() => {
            handleFavorite(selectedProduct.id);
          }}
          style={styles.favoriteButtonModal}
        >
          <Text style={{ color: selectedProduct.favorite ? 'red' : 'black', fontSize: 24,marginLeft:290, fontSize:40 }}>🖤</Text>
        </TouchableOpacity>    
            <TouchableOpacity style={styles.locationIcon} onPress={toggleLocationExpanded}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 230 }}>
            <Text style={{ marginLeft: 18 }}>
              <Icon name="map-marker" size={34} color="black" />
            </Text>
            {locationName && (
              <TouchableOpacity onPress={toggleLocationExpanded} style={styles.locationTextContainer}>
                <Text style={styles.locationText}>Deliver to {locationName.country}</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButtonModal}
          onPress={() => {
            handleAddToCart(selectedProduct.id);
            // setModalVisible(!modalVisible);
          }}
        >
          
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleFavorite(selectedProduct.id);
          }}
          style={styles.favoriteButtonModal}
        >
        </TouchableOpacity>
      </View>
    )}

    {/* Close button for the modal */}
    <TouchableOpacity
      style={styles.closeButtonModal}
      onPress={() => setModalVisible(!modalVisible)}
    >
      <Text style={styles.closeButtonText}>Proceed</Text>
    </TouchableOpacity>
 
    </ScrollView>
</Modal>



  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modalContainerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  fixedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    zIndex: 1,
  },
  
  locationIcon: {
    marginRight: 5,
  },
  locationTextContainer: {
    marginLeft: 5,
  },
  locationText: {
    flexDirection: 'column',
  },
  
  cardsContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width,
  },
  cardContainer: {
    justifyContent: 'space-between',
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
    width: Dimensions.get('window').width / 2 - 20,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  searchIcon: {
    marginRight: 180,
  },
  searchBarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width - 150,
  },
  addToCartButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    // width: 100,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  cartIcon: {
    marginLeft: 10,
  },
  logo: {
    width: 40, // Set the width as per your requirement
    height: 40, // Set the height as per your requirement
    resizeMode: 'contain', // Make sure the logo scales properly
  },
  productImageModal: {
    width: '100%', // Set the width to 100% to fit the modal
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // Preserve the aspect ratio and cover the container
  },
  addToCartButtonModal: {
    backgroundColor: 'black', // Set your desired background color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  productDetailsContainer: {
    alignItems: 'center',
  },

  productImageModal: {
    width: 350,
    height: 350,
    marginBottom: 10,
    borderRadius: 10,
  },

  modalText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  modalDescription: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

  modalPrice: {
    fontSize: 26,
    marginBottom: 10,
    color: 'green', // Change the color as needed
  },

  addToCartButtonModal: {
    backgroundColor: 'black', // Change the background color as needed
    padding: 10,
    borderRadius: 20,
    marginTop: 90,
    width:190
  },

  addToCartButtonText: {
    color: 'white', // Change the text color as needed
    fontSize: 16,
    textAlign: 'center',
  },

  favoriteButtonModal: {
    marginTop: 10,
  },

  closeButtonModal: {
    backgroundColor: 'black', // Change the background color as needed
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width:190
  },

  closeButtonText: {
    color: 'white', // Change the text color as needed
    fontSize: 18,
    textAlign: 'center',
  },
});



export default WelcomeScreen;

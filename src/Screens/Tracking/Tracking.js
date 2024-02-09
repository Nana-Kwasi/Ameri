// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// const TrackingScreen = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [locationName, setLocationName] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const location = await Location.getCurrentPositionAsync({});
//         setCurrentLocation(location.coords);

//         const geocodingResult = await reverseGeocode(location.coords);
//         setLocationName(geocodingResult);
//       } catch (error) {
//         console.error('Error getting location:', error);
//       }
//     };

//     fetchLocation();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const searchLocation = await Location.geocodeAsync(searchQuery);

//       if (searchLocation && searchLocation.length > 0) {
//         const result = searchLocation[0];

//         setCurrentLocation({
//           latitude: result.latitude,
//           longitude: result.longitude,
//         });

//         const readableAddress = [result.subregion, result.city, result.region, result.country].filter(Boolean).join(', ');
//         setLocationName(readableAddress);
//       } else {
//         console.log('Search result is empty.');
//       }
//     } catch (error) {
//       console.error('Error during location search:', error);
//     }
//   };

// // Function to reverse geocode coordinates to a location name
// const reverseGeocode = async (coords) => {
//   try {
//     // Set a longer timeout (e.g., 15 seconds) for reverse geocoding
//     const geocoding = await Location.reverseGeocodeAsync(coords, { timeout: 15000 });

//     if (geocoding && geocoding.length > 0) {
//       const result = geocoding[0];
//       console.log('Full Geocoding Result:', result);

//       // Construct a readable address using available fields
//       const readableAddress = [result.district, result.city, result.region, result.country].filter(Boolean).join(', ');
//       console.log('Readable Address:', readableAddress);

//       return readableAddress;
//     } else {
//       console.log('Geocoding result is empty.');
//       return 'Unknown Location';
//     }
//   } catch (error) {
//     console.error('Error during geocoding:', error);
//     return 'Error getting location name';
//   }
// };


//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search location..."
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//         <Button title="Search" onPress={handleSearch} />
//       </View>
//       {currentLocation ? (
//         <MapView
//           style={styles.map}
//           region={{
//             latitude: currentLocation.latitude,
//             longitude: currentLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//             }}
//             title="Current Location"
//           />
//         </MapView>
//       ) : (
//         <View style={styles.loadingContainer}>
//           <Text>Loading...</Text>
//         </View>
//       )}

//       {locationName && (
//         <View style={styles.locationNameContainer}>
//           <Text style={styles.locationNameText}>{locationName}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   locationNameContainer: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     right: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 8,
//     borderRadius: 8,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   searchInput: {
//     flex: 1,
//     marginRight: 10,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//   },
//   locationNameText: {
//     fontSize: 16,
//   },
// });

// export default TrackingScreen;


import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TrackingScreen = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: '123456',
    deliveryStatus: 'In Transit',
    estimatedDeliveryTime: '30 minutes',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Placeholder logic for search (replace with actual search logic)
    console.log('Searching for order:', searchQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter order number..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Track Order</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderNumberText}>Order #{orderDetails.orderNumber}</Text>
        <Text style={styles.deliveryStatusText}>Status: {orderDetails.deliveryStatus}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Estimated Delivery Time: {orderDetails.estimatedDeliveryTime}
        </Text>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderDetailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  orderNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryStatusText: {
    fontSize: 16,
    marginBottom: 8,
  },
  estimatedDeliveryText: {
    fontSize: 16,
  },
});

export default TrackingScreen;

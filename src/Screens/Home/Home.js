import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Location from 'expo-location';

const Home = ({ navigation }) => {
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [locationName, setLocationName] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);


    //  useEffect(() => {
    // const fetchLocation = async () => {
    //   try {
    //     // Get the current location without explicitly requesting permission
    //     const location = await Location.getCurrentPositionAsync({});
    //     setCurrentLocation(location.coords);

    //     // Perform geocoding to get the location name
    //     const geocodingResult = await reverseGeocode(location.coords);
    //     setLocationName(geocodingResult);

    //     setIsLoading(false); // Set loading to false when location details are fetched

    //   } catch (error) {
    //     console.error('Error getting location:', error);
    //     setIsLoading(false); 
    //   }
    // };

  //   fetchLocation();
  // }, []);

  // const reverseGeocode = async (coords) => {
  //   try {
  //     const geocoding = await Location.reverseGeocodeAsync(coords);

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

  const navigateToStore = () => {
  {
    navigation.navigate('Stores', {
    //   location: {
    //     currentLocation: currentLocation,
    //     locationName: locationName,
    //   },
     });
  }
};


  return (
    <ImageBackground
      source={require('../../../assets/cart.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Ameriless</Text>
        <Text style={styles.subtitle}>Shop effortlessly</Text>
        {/* {locationName && (
          <View style={styles.locationNameContainer}>
            <Text style={styles.locationNameText}>{locationName}</Text>
          </View>
        )} */}
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToStore}>
        <Text style={styles.buttonText}>Go to Stores</Text>
        <Icon name="arrow-right" size={20} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    color: 'white',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginHorizontal: 90,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  locationNameContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  locationNameText: {
    fontSize: 16,
  },
});

export default Home;







// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Swiper from 'react-native-swiper';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Home = ({ navigation }) => {
//   const handleSkip = () => {
//     // Navigate to the login screen
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <Swiper style={styles.wrapper} showsButtons={false}>
//         <View style={styles.slide}>
//           <ImageSlider source={require('../../assets/cart.jpg')} />
//         </View>
//         <View style={styles.slide}>
//           <ImageSlider source={require('../../assets/pla.jpg')} />
//         </View>
//         <View style={styles.slide}>
//           <ImageSlider source={require('../../assets/kid.jpg')} />
//           {/* Add an arrow here */}
//           <TouchableOpacity style={styles.arrowButton} onPress={handleSkip}>
//             <Icon name="arrow-right" size={30} color="white" />
//           </TouchableOpacity>
//         </View>
//         {/* Add more slides with different images here */}
//       </Swiper>
//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
      
//       <Text style={{color:'yellow', marginBottom:40}}>
//           wertyuiop
//         </Text>
     
//     </View>
//   );
// };

// const ImageSlider = ({ source }) => (
//   <Image
//     source={source}
//     style={styles.imageBackground}
//     resizeMode="cover"
//   />
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   wrapper: {},
//   slide: {
//     flex: 1,
//     position: 'relative', // Add this to position the arrow button
//   },
//   imageBackground: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   skipButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: 'transparent',
//     padding: 10,
//     fontSize: 25,
//     color: 'salmon',
//     fontWeight: 'bold',
//   },
//   skipText: {
//     fontSize: 25,
//     color: 'salmon',
//     fontWeight: 'bold',
//   },
//   arrowButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: 'transparent',
//     marginRight:40,
//     marginBottom:30
//   },
// });

// export default Home;

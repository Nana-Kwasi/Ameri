import React, {useState,useEffect,useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';
const CheckoutScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [gateCode, setGateCode] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [locationName, setLocationName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneNumberValid = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const fetchLocation = useCallback(async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log('Current Location:', location);

      const geocodingResult = await reverseGeocode(location.coords);
      console.log('Geocoding Result:', geocodingResult);
      setLocationName(geocodingResult);

      setIsLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();

    // Cleanup effect
    return () => {
      setLocationName(null);
      setIsLoading(true);
    };
  }, [fetchLocation]);
  useEffect(() => {
    // Update form fields when location information is available
    if (locationName) {
      setCity(locationName.city || '');
      setCountry(locationName.country || '');
      setStreetAddress(locationName.name || '');
    }
  }, [locationName]);

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
  const handleContinue = () => {
    // Validate form fields
    if (!fullName || !isPhoneNumberValid(phoneNumber) || !isEmailValid(emailAddress) || !streetAddress || !city || !stateProvince || !postalCode || !country) {
      Alert.alert('Error', 'Please fill in all required fields with valid information');
      return;
    }
    if (!fullName || !phoneNumber || !emailAddress || !streetAddress || !city || !stateProvince || !postalCode || !country) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Perform further actions, e.g., submit the order, navigate to the confirmation screen, etc.

    // For demonstration purposes, just display the submitted data
    const submittedData = {
      ContactInformation: {
        FullName: fullName,
        PhoneNumber: phoneNumber,
        EmailAddress: emailAddress,
      },
      DeliveryAddress: {
        StreetAddress: streetAddress,
        City: city,
        StateProvince: stateProvince,
        PostalCode: postalCode,
        Country: country,
      },
      AdditionalAddressDetails: {
        ApartmentNumber: apartmentNumber,
        GateCode: gateCode,
      },
      DeliveryInstructions: deliveryInstructions,
    };

    Alert.alert('Order Submitted', JSON.stringify(submittedData));

    // Reset form fields
    setFullName('');
    setPhoneNumber('');
    setEmailAddress('');
    setStreetAddress('');
    setCity('');
    setStateProvince('');
    setPostalCode('');
    setCountry('');
    setApartmentNumber('');
    setGateCode('');
    setDeliveryInstructions('');
  };
  const LocationCard = ({ locationInfo }) => {
    // console.log('LocationInfo:', locationInfo); // Log the locationInfo
    return (
      <Card style={styles.locationCard}>
        <Card.Content>
          <Text style={styles.locationInfo}>
            {locationInfo
              ? ` ${locationInfo.city}, ${locationInfo.country }, ${locationInfo.name }`
              : 'Loading Location'}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/DD.jpg')} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View></View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.title1}>Delivery</Text>
                <TextInput
                  style={[styles.input, !fullName && styles.requiredInput]} // Apply red border if fullName is empty
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholderTextColor={'black'}
                />
                <TextInput
                  style={[styles.input, !phoneNumber && styles.requiredInput]} // Apply red border if phoneNumber is empty
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholderTextColor={'black'}
                />
                <TextInput
                  style={[styles.input, !emailAddress && styles.requiredInput]} // Apply red border if emailAddress is empty
                  placeholder="Email Address"
                  keyboardType="email-address"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  placeholderTextColor={'black'}
                />

                <Text style={styles.title}>Delivery Address</Text>
                <TextInput
                  style={styles.input}
                  editable={!locationName}  // Set editable to false when locationName is available
                  placeholder="Street Address"
                  value={streetAddress}
                  onChangeText={setStreetAddress}
                  placeholderTextColor={'black'}
                />
                <TextInput
                  style={styles.input}
                  editable={!locationName}  // Set editable to false when locationName is available
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  placeholderTextColor={'black'}
                />
                  <TextInput
                  style={styles.input}
                  editable={!locationName}  // Set editable to false when locationName is available
                  placeholder="Country"
                  value={country}
                  onChangeText={setCountry}
                  placeholderTextColor={'black'}
                />

                {/* <TextInput
                  style={styles.input}
                  placeholder="State/Province"
                  value={stateProvince}
                  onChangeText={setStateProvince}
                  placeholderTextColor={'black'}
                /> */}
                {/* <TextInput
                  style={styles.input}
                  placeholder="ZIP/Postal Code"
                  value={postalCode}
                  onChangeText={setPostalCode}
                  placeholderTextColor={'black'}
                /> */}
              
                <Text style={styles.title}>Additional Details</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Apartment or Suite Number"
                  value={apartmentNumber}
                  onChangeText={setApartmentNumber}
                  placeholderTextColor={'black'}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Gate Code (if applicable)"
                  value={gateCode}
                  onChangeText={setGateCode}
                  placeholderTextColor={'black'}
                />

                  <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    if (!fullName || !phoneNumber || !emailAddress) {
                      Alert.alert('Error', 'Full Name, Phone Number, and Email Address are compulsory');
                    } else {
                      navigation.navigate('Choose');
                    }
                  }}
                  disabled={!fullName || !phoneNumber || !emailAddress} // Disable the button if required fields are empty
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Continue</Text>
                </TouchableOpacity>


              </Card.Content>
            </Card>
          </View>
       
      </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cardContainer: {
    margin: 16,
    borderRadius: 55,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'white',
    marginTop:50
  },
  cardContent: {
    overflow: 'hidden',
  },
  requiredInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 70,
    color: 'black',
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 100,
    marginHorizontal: 80,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingLeft: 8,
    color: 'black',
    fontSize: 20,
    marginHorizontal: 10,
  },
  submitButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  locationCard: {
    marginBottom: 16,
  },

  locationInfo: {
    fontSize: 16,
    color: 'brown',
  },
});

export default CheckoutScreen;



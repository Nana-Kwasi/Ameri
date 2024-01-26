import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const EducationScreen = () => {
  const navigation = useNavigation();

  const handleCardPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Icon size={80} icon="account" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={false}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => handleCardPress('Cart')}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph>Your orders</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('Welcome')}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph>Buy again</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => handleCardPress('Welcome')}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph>Continue shopping</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('Wishlist')}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph>Your lists</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 20,
    marginHorizontal: 10,
    minWidth: 150,
  },
});

export default EducationScreen;


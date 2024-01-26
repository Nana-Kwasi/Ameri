import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MemoriesScreen = () => {
  const memoriesData = [
    {
      image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
      activity: "Arts and Crafts"
    },
    {
      image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
      activity: "Outdoor Play"
    },
    {
      image: require('../../assets/akata.jpg'), // Replace with the actual image file path
      activity: "Story Time"
    },
    {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Arts and Crafts"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Outdoor Play"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Story Time"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Gardening"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Baking Cookies"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Science Experiment"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Field Trip"
      },
      {
        image: require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Music and Dance"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Arts and Crafts"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Outdoor Play"
      },
      {
        image: require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Story Time"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Gardening"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Baking Cookies"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Science Experiment"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Field Trip"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Music and Dance"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Picnic"
      },
      {
        image:  require('../../assets/akata.jpg'), // Replace with the actual image file path
        activity: "Soccer Game" 
      },
    // Add more memory items with images and activities
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Memories</Text>
      {memoriesData.map((memory, index) => (
        <View key={index} style={[styles.card, { backgroundColor: index % 2 === 0 ? '#FFC0CB' : '#ADD8E6' }]}>
          <Image source={memory.image} style={styles.image} />
          <Text style={styles.activityText}>{memory.activity}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop:70
  },
  card: {
    width: 300,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    width:350,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MemoriesScreen;

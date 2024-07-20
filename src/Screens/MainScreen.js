import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import WeatherScreen from './WeatherScreen';
import SearchBar from '../Components/SearchBar';

const MainScreen = ({ navigation, cities, searchCity, setSearchCity, handleAddCity, handleDeleteCity }) => (
  <View style={styles.container}>
    <SearchBar
      searchCity={searchCity}
      setSearchCity={setSearchCity}
      handleAddCity={handleAddCity}
    />
    {cities.length > 0 ? (
      <Swiper style={styles.wrapper} showsButtons loop>
        {cities.map((city, index) => (
          <View key={index} style={styles.slide}>
            <WeatherScreen city={city} onDelete={handleDeleteCity} />
          </View>
        ))}
      </Swiper>
    ) : (
      <Text style={styles.noCitiesText}>
        No cities added. Please add a city.
      </Text>
    )}
    <TouchableOpacity
      style={styles.listViewButton}
      onPress={() => navigation.navigate('CityList')}
    >
      <Text style={styles.listViewButtonText}>View List</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
  },
  noCitiesText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  listViewButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  listViewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainScreen;
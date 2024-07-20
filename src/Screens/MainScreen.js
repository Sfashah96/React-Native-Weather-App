import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import SearchBar from '../Components/SearchBar';
import { useWeather } from '../Context/WeatherContext';
import MainScreenCard from '../Components/MainScreenCard';

const { height } = Dimensions.get('window');

const MainScreen = () => {
  const {
    cities,
    searchCity,
    setSearchCity,
    handleAddCityWrapper,
    handleDeleteCityWrapper,
  } = useWeather();

  return (
    <View style={styles.container}>
      <SearchBar
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        handleAddCity={handleAddCityWrapper}
      />
      {cities.length > 0 ? (
        <Swiper style={styles.wrapper}>
          {cities.map((city, index) => (
            <View key={index} style={styles.slide}>
              <MainScreenCard city={city} onDelete={handleDeleteCityWrapper} />
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
};

const styles = StyleSheet.create({
  container: {
    height: height,
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

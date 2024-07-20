import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import useFetch from '../Services/useFetch';

const API_KEY = 'beafb1acf6714ac8a9a94612241807';

const CityCard = ({ city }) => {
  const { data: weather, loading, error } = useFetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Error loading weather data</Text>;
  if (!weather) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cityName}>{weather.location.name}</Text>
      <Text style={styles.countryName}>{weather.location.country}</Text>
      <View style={styles.weatherInfo}>
        <Image 
          source={{ uri: `https:${weather.current.condition.icon}` }} 
          style={styles.weatherIcon} 
        />
        <Text style={styles.temperature}>{Math.round(weather.current.temp_c)}°C</Text>
      </View>
      <Text style={styles.condition}>{weather.current.condition.text}</Text>
      <Text style={styles.weatherDetail}>Humidity: {weather.current.humidity}%</Text>
      <Text style={styles.weatherDetail}>Wind: {weather.current.wind_kph} km/h</Text>
    </View>
  );
};

const CityListScreen = ({ cities }) => {
  return (
    <FlatList
      data={cities}
      renderItem={({ item }) => <CityCard city={item} />}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countryName: {
    fontSize: 16,
    color: 'gray',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  condition: {
    fontSize: 18,
    marginTop: 5,
  },
  weatherDetail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CityListScreen;
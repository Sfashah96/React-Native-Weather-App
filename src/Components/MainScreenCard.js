import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import useWeatherData from '../Hooks/useWeatherData';
import { getBackgroundImage } from '../utils/getImage';

const { width } = Dimensions.get('screen')

const MainScreenCard = ({ city, onDelete }) => {
  const { data: weather, loading, error } = useWeatherData(city);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!weather) {
    return <Text style={styles.errorText}>No weather data available</Text>;
  }

  const backgroundImage = getBackgroundImage(weather.current.condition.text);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.weatherContainer}>
        <Text style={styles.cityName}>{weather.location.name}</Text>
        <Text style={styles.cityName}>{weather.location.country}</Text>
        <Text style={styles.temperature}>{Math.round(weather.current.temp_c)}°C</Text>
        <Text style={styles.description}>{weather.current.condition.text}</Text>
        <Text style={styles.weatherInfo}>Humidity: {weather.current.humidity}%</Text>
        <Text style={styles.weatherInfo}>Wind: {weather.current.wind_kph} km/h</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(city)}>
          <Text style={styles.deleteButtonText}>Delete City</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.9
  },
  weatherContainer: {
    padding: 20,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  weatherInfo: {
    fontSize: 14
    ,
    color: 'white',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainScreenCard;
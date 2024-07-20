import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import useFetch from '../Services/useFetch';

const API_KEY = 'beafb1acf6714ac8a9a94612241807';

const getBackgroundImage = condition => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return require('../assets/sunny.jpg');
    case 'partly cloudy':
    case 'cloudy':
    case 'overcast':
      return require('../assets/cloudy.jpg');
    case 'rain':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
    case 'showers':
      return require('../assets/rainy.jpg');
    default:
      return require('../assets/default.jpg');
  }
};

const WeatherScreen = ({city, onDelete}) => {
  const {
    data: weather,
    loading,
    error,
    statusCode,
  } = useFetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`,
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    let errorMessage = 'An error occurred';
    if (statusCode === 400) {
      errorMessage = 'Invalid request. Please check the city name.';
    } else if (statusCode === 401) {
      errorMessage = 'Unauthorized. Please check your API key.';
    } else if (statusCode === 403) {
      errorMessage = 'Access forbidden. Please check your API permissions.';
    } else if (statusCode === 404) {
      errorMessage = 'City not found. Please try another city name.';
    } else if (statusCode >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    return <Text style={styles.errorText}>Error: {errorMessage}</Text>;
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
        <Text style={styles.temperature}>
          {Math.round(weather.current.temp_c)}°C
        </Text>
        <Text style={styles.description}>{weather.current.condition.text}</Text>
        <Text style={styles.weatherInfo}>
          Humidity: {weather.current.humidity}%
        </Text>
        <Text style={styles.weatherInfo}>
          Wind: {weather.current.wind_kph} km/h
        </Text>
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
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  weatherContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  weatherInfo: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
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

export default WeatherScreen;

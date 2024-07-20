import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Screens/MainScreen';
import CityListScreen from './Screens/CityListScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function WeatherApp() {
  const [cities, setCities] = useState([
    'London',
    'New York',
    'Tokyo',
    'Sydney',
    'Paris',
  ]);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const storedCities = await AsyncStorage.getItem('cities');
      if (storedCities !== null) {
        setCities(JSON.parse(storedCities));
      }
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  const saveCities = async newCities => {
    try {
      await AsyncStorage.setItem('cities', JSON.stringify(newCities));
    } catch (error) {
      console.error('Error saving cities:', error);
    }
  };

  const handleAddCity = () => {
    if (searchCity && !cities.includes(searchCity.split(',')[0])) {
      const newCities = [...cities, searchCity.split(',')[0]];
      setCities(newCities);
      saveCities(newCities);
      setSearchCity('');
    } else if (cities.includes(searchCity.split(',')[0])) {
      Alert.alert('City already exists', 'This city is already in your list.');
    }
  };

  const handleDeleteCity = cityToDelete => {
    Alert.alert(
      'Delete City',
      `Are you sure you want to delete ${cityToDelete}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const newCities = cities.filter(city => city !== cityToDelete);
            setCities(newCities);
            saveCities(newCities);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Weather">
          {props => (
            <MainScreen
              {...props}
              cities={cities}
              setCities={setCities}
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              handleAddCity={handleAddCity}
              handleDeleteCity={handleDeleteCity}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="CityList">
          {props => <CityListScreen {...props} cities={cities} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

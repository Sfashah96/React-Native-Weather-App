import React from 'react';
import { FlatList, View } from 'react-native';
import CityCard from '../Components/CityCard';
import { useWeather } from '../Context/WeatherContext';

const CityListScreen = () => {
  const { cities } = useWeather();
  return (
    <View>
      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CityCard city={item} />}
      />
    </View>
  );
};

export default CityListScreen;

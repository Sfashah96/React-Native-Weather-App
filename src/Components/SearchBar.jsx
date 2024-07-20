import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getCitySuggestions} from '../Services/WeatherApi';

const CityList = ({cities, onSelectCity}) => {
  return (
    <FlatList
      data={cities}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.cityItem}
          onPress={() => onSelectCity(item.name)}>
          <Text>
            {item.name}, {item.country}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const SearchBar = ({searchCity, setSearchCity, handleAddCity}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchCity.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getCitySuggestions(searchCity);
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchCity]);

  const handleSelectCity = city => {
    setSearchCity(city);
    setSuggestions([]);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name"
          value={searchCity}
          onChangeText={setSearchCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleAddCity}>
          <Text style={styles.searchButtonText}>Add City</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        suggestions.length > 0 && (
          <CityList cities={suggestions} onSelectCity={handleSelectCity} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
});

export default SearchBar;

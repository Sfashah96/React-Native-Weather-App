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

const API_KEY = 'beafb1acf6714ac8a9a94612241807';

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

  const getCitySuggestions = async input => {
    if (input.length < 3) return; // Don't search for very short inputs

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchCity) {
        getCitySuggestions(searchCity);
      } else {
        setSuggestions([]);
      }
    }, 300); // Debounce by 300ms

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

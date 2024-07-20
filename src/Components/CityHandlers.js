import { Alert } from 'react-native';
import { saveCities } from '../utils/async-storage';

export const handleAddCity = (searchCity, cities, setCities, setSearchCity) => {
    if (searchCity && !cities.includes(searchCity.split(',')[0])) {
        const newCities = [...cities, searchCity.split(',')[0]];
        setCities(newCities);
        saveCities(newCities);
        setSearchCity('');
    } else if (cities.includes(searchCity.split(',')[0])) {
        Alert.alert('City already exists', 'This city is already in your list.');
    }
};

export const handleDeleteCity = (cityToDelete, cities, setCities) => {
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
        { cancelable: false },
    );
};

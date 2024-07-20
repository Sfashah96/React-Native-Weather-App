import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadCities = async () => {
  try {
    const storedCities = await AsyncStorage.getItem('cities');
    if (storedCities !== null) {
      return JSON.parse(storedCities);
    }
    return [];
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
};

export const saveCities = async newCities => {
  try {
    await AsyncStorage.setItem('cities', JSON.stringify(newCities));
  } catch (error) {
    console.error('Error saving cities:', error);
  }
};
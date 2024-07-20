import React, { createContext, useState, useEffect, useContext } from 'react';
import { loadCities } from '../utils/async-storage';
import { handleAddCity, handleDeleteCity } from '../Components/CityHandlers';

export const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);
export const WeatherProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [searchCity, setSearchCity] = useState('');

    useEffect(() => {
        const fetchCities = async () => {
            const loadedCities = await loadCities();
            setCities(loadedCities);
        };
        fetchCities();
    }, []);

    const handleAddCityWrapper = () => {
        handleAddCity(searchCity, cities, setCities, setSearchCity);
    };

    const handleDeleteCityWrapper = (cityToDelete) => {
        handleDeleteCity(cityToDelete, cities, setCities);
    };

    return (
        <WeatherContext.Provider
            value={{
                cities,
                setCities,
                searchCity,
                setSearchCity,
                handleAddCityWrapper,
                handleDeleteCityWrapper,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};
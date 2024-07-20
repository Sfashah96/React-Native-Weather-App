import { useState, useEffect } from 'react';
import weatherApi from '../Services/WeatherApi';

const useWeatherData = (city) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!city) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await weatherApi.get('/current.json', {
                    params: { q: city, aqi: 'no' },
                });
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError('Failed to fetch weather data');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    return { data, loading, error };
};

export default useWeatherData;
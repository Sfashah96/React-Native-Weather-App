import axios from 'axios';

const API_KEY = 'beafb1acf6714ac8a9a94612241807';
const BASE_URL = 'http://api.weatherapi.com/v1';

const weatherApi = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

export const getCitySuggestions = async (input) => {
    if (input.length < 3) return [];

    try {
        const response = await weatherApi.get('/search.json', {
            params: { q: input },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
        throw error;
    }
};

export default weatherApi;

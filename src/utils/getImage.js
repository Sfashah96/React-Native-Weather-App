export const getBackgroundImage = condition => {
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
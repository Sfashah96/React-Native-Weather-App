import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { WeatherProvider } from '../Context/WeatherContext';
import MainScreen from '../Screens/MainScreen';
import CityListScreen from '../Screens/CityListScreen';
import { Image } from 'react-native';
import { Header } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <WeatherProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerStyle: {
                            backgroundColor: '#123456',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconSource;

                            if (route.name === 'Weather') {
                                iconSource = focused
                                    ? require('../assets/weather-focused.png')
                                    : require('../assets/weather.png');
                            } else if (route.name === 'CityList') {
                                iconSource = focused
                                    ? require('../assets/cityList-focused.png')
                                    : require('../assets/cityList.png');
                            }

                            return <Image source={iconSource} style={{ width: size, height: size }} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="Weather" component={MainScreen} options={{ headerShown: false }} />
                    <Tab.Screen name="CityList" component={CityListScreen} options={{ headerShown: false }} />
                </Tab.Navigator>
            </NavigationContainer>
        </WeatherProvider>
    );
};

export default TabNavigation;

import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WeatherProvider} from './src/Context/WeatherContext';
import TabNavigation from './src/Navigations/TabNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <WeatherProvider>
        <TabNavigation />
      </WeatherProvider>
    </GestureHandlerRootView>
  );
}

import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import WeatherApp from './src/WeatherApp';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <WeatherApp />
    </GestureHandlerRootView>
  );
}

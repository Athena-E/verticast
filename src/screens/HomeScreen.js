// HomeScreen.js

import React from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';
import SingleWeatherWidget from '../components/SingleWeatherWidget';
import BigTemperatureLabel from '../components/BigTemperatureLabel';
import DateSelectorDisplay from '../components/DateSelectorDisplay';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay';

// Home Screen page
// TODO: will make this more general i.e. general weather display, not just Home Screen

const HomeScreen = ({navigation}) => {
  // Structure: Date selector, Big temperature + location, Weather widgets, Hourly weather scrollbar
  return (
    <ImageBackground
      source={require('../assets/mountain-vector-background.webp')}
      style={homeStyles.background}>
      <View style={homeStyles.container}>
        <DateSelectorDisplay />
        <View style={homeStyles.contentContainer}>
          <BigTemperatureLabel temperature={20} placeName="Ben Nevis" />
          <View style={homeStyles.widgetContainer}>
            <SingleWeatherWidget label="Wind Speed" value={10} unit="mph" />
            <SingleWeatherWidget label="Wind Direction" value="NNE" unit="" />
            <SingleWeatherWidget label="Visibility" value={'High'} unit="" />
            <SingleWeatherWidget label="Precipitation" value={'25%'} unit="" />
          </View>
          <View>
            <HourlyWeatherDisplay />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const homeStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  contentContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

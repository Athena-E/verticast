import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// component for scrolling hourly weather on the main weather page

const HourlyWeatherDisplay = () => {
  // temporary mock data
  const hourlyData = [
    {time: '12:00 PM', temperature: '25°C', weatherCondition: 'Sunny'},
    {time: '01:00 PM', temperature: '26°C', weatherCondition: 'Sunny'},
    {time: '02:00 PM', temperature: '27°C', weatherCondition: 'Partly Cloudy'},
    {time: '03:00 PM', temperature: '28°C', weatherCondition: 'Partly Cloudy'},
    {time: '04:00 PM', temperature: '28°C', weatherCondition: 'Cloudy'},
    {time: '05:00 PM', temperature: '27°C', weatherCondition: 'Cloudy'},
    {time: '06:00 PM', temperature: '26°C', weatherCondition: 'Showers'},
    {time: '07:00 PM', temperature: '25°C', weatherCondition: 'Showers'},
    {time: '08:00 PM', temperature: '24°C', weatherCondition: 'Thunderstorms'},
    {time: '09:00 PM', temperature: '23°C', weatherCondition: 'Thunderstorms'},
    {time: '10:00 PM', temperature: '22°C', weatherCondition: 'Thunderstorms'},
    {time: '11:00 PM', temperature: '21°C', weatherCondition: 'Thunderstorms'},
  ];

  return (
    <View>
      <ScrollView horizontal={true} style={hourlyWeatherStyles.scrollContainer}>
        {hourlyData.map((hour, index) => (
          <View key={index} style={hourlyWeatherStyles.hourContainer}>
            <Icon name={'thunderstorm'} size={50} color="#fff" />
            <Text style={hourlyWeatherStyles.label}>{hour.temperature}</Text>
            <Text style={hourlyWeatherStyles.label}>{hour.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const hourlyWeatherStyles = StyleSheet.create({
  scrollContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(167, 178, 194, 0.6)',
    maxHeight: 110,
  },
  hourContainer: {
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
  },
});

export default HourlyWeatherDisplay;

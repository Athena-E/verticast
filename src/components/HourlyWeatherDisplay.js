import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {sendHourlyWeatherReq} from '../data/api_req';
import {weatherIcons} from '../data/weatherCodes';

// component for scrolling hourly weather on the main weather page

const HourlyWeatherDisplay = ({isScreenFocused, location}) => {
  // temporary mock data
  const hourlyDataTemp = [
    {time: '12:00 PM', temperature_180m: '25', weather_code: 1},
    {time: '01:00 PM', temperature_180m: '26', weather_code: 1},
    {time: '02:00 PM', temperature_180m: '27', weather_code: 1},
    {time: '03:00 PM', temperature_180m: '28', weather_code: 1},
    {time: '04:00 PM', temperature_180m: '28', weather_code: 1},
    {time: '05:00 PM', temperature_180m: '27', weather_code: 1},
    {time: '06:00 PM', temperature_180m: '26', weather_code: 1},
    {time: '07:00 PM', temperature_180m: '25', weather_code: 1},
    {time: '08:00 PM', temperature_180m: '24', weather_code: 1},
    {time: '09:00 PM', temperature_180m: '23', weather_code: 1},
    {time: '10:00 PM', temperature_180m: '22', weather_code: 1},
    {time: '11:00 PM', temperature_180m: '21', weather_code: 1},
  ];
  const [hourlyData, setHourlyData] = useState(hourlyDataTemp);

  useEffect(() => {
    const sendHourlyDataWithAPI = async () => {
      try {
        const result = await sendHourlyWeatherReq(location);
        if (!('error' in result)) {
          setHourlyData(result);
        }
        console.log('HOURLY:', location, hourlyData);
      } catch (err) {
        console.log('send error', err.message);
      }
    };
    sendHourlyDataWithAPI();
  }, [isScreenFocused, location]);

  return (
    <View>
      <ScrollView horizontal={true} style={hourlyWeatherStyles.scrollContainer}>
        {hourlyData.map((hour, index) => (
          <View key={index} style={hourlyWeatherStyles.hourContainer}>
            <Icon
              name={weatherIcons[hour.weather_code]}
              size={50}
              color="#fff"
            />
            <Text style={hourlyWeatherStyles.label}>
              {Math.round(hour.temperature_180m)}°C
            </Text>
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
    backgroundColor: 'rgba(96, 126, 156, 0.6)',
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

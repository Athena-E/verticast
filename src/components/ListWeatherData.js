import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

// component for extra listed weather data on main weather page

const ListWidget = ({label, value}) => {
  // list widget component
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
      }}>
      <Text style={{fontSize: 20, fontStyle: 'italic'}}>{label}</Text>
      <Text style={{fontSize: 20}}>{value}</Text>
    </View>
  );
};

const ListWeatherData = ({}) => {
  const extraData = {
    high: '22°C',
    low: '5°C',
    sunrise: '5:00 AM',
    sunset: '9:00 PM',
    'air pollution': 'Low',
    'UV index': 'Moderate',
  }; // temporary mock data

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <View style={widgetStyles.widgetContainer}>
        {Object.keys(extraData).map(key => (
          <ListWidget label={key} value={extraData[key]} />
        ))}
      </View>
    </View>
  );
};

const widgetStyles = StyleSheet.create({
  textContainer: {
    flex: 1,
    textAlign: 'left',
    fontSize: 30,
    color: '#000',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 40,
    color: '#000',
  },
  unit: {
    fontSize: 20,
    color: '#000',
  },
  widgetContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 250, 235, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default ListWeatherData;

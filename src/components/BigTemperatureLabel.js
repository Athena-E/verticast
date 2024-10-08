import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// component for main temperature label on the main weather page

const BigTemperatureLabel = ({temperature, placeName}) => {
  return (
    <View style={TempStyles.container}>
      <Text style={TempStyles.value}>{temperature}°</Text>
      <Text style={TempStyles.label}>{placeName}</Text>
    </View>
  );
};

const TempStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  value: {
    fontSize: 100,
    color: '#000',
  },
});

export default BigTemperatureLabel;

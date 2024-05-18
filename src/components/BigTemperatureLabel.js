import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// component for main temperature label on the main weather page

const BigTemperatureLabel = ({temperature, placeName}) => {
  // temporary variables for temperature and placeName to receive api response data

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
    marginBottom: 10,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 100,
    color: '#000',
  },
});

export default BigTemperatureLabel;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// component for main temperature label on the main weather page

const BigTemperatureLabel = ({temperature, placeName}) => {
  // temporary variables for temperature and placeName to receive api response data
  const [tempData, setTempData] = useState(null);
  const [placeData, setPlaceData] = useState(null);

  // called twice after render
  useEffect(() => {
    fetchTempData();
  }, []);

  // api request
  const fetchTempData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/data');
      const responseData = await response.json();
      setTempData(responseData.temperature);
      console.log(tempData);
      setPlaceData(responseData.location);
      console.log(placeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={TempStyles.container}>
      <Text style={TempStyles.value}>{tempData}°</Text>
      <Text style={TempStyles.label}>{placeData}</Text>
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

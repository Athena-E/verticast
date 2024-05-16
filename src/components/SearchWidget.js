import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styles from '../utils/styles';

// Template for creating components

const ComponentTemplate = ({temperature, location}) => {
  const handleRecWidgetClick = () => {};

  return (
    <TouchableOpacity style={favWidgetStyles.widgetContainer}>
      <Text style={{marginRight: 10, fontSize: 40}}>{temperature}°</Text>
      <Text style={{marginLeft: 20, fontSize: 30}}>{location}</Text>
    </TouchableOpacity>
  );
};

const favWidgetStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    padding: 20,
    marginVertical: 5,
    shadowRadius: 5,
    shadowColor: '#000',
    elevation: 15,
  },
});

export default ComponentTemplate;

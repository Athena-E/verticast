import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// component for the weather widget showing just a single metric

const SingleWeatherWidget = ({label, value, unit}) => {
  return (
    <View style={widgetStyles.container}>
      <View style={widgetStyles.widget}>
        <View style={widgetStyles.textContainer}>
          <Text style={widgetStyles.value}>
            {value} <Text style={widgetStyles.unit}>{unit}</Text>
          </Text>
          <Text style={widgetStyles.label}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

const widgetStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  widget: {
    flexDirection: 'row',
    backgroundColor: 'rgba(96, 126, 156, 0.6)',
    borderRadius: 10,
    padding: 10,
    height: 120,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 150,
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
});

export default SingleWeatherWidget;

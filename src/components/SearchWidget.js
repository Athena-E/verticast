import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Template for creating components

const ComponentTemplate = ({temperature, location, navigation}) => {
  const handleWidgetClick = () => {
    navigation.navigate('WeatherLocation');
  };

  return (
    <TouchableOpacity
      style={favWidgetStyles.widgetContainer}
      onPress={handleWidgetClick}>
      <Text style={{fontSize: 40}}>{temperature}°</Text>
      <Text style={{fontSize: 30}}>{location}</Text>
      <TouchableOpacity>
        <Icon name="add-circle-outline" size={40} color="#ffa70f" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const favWidgetStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

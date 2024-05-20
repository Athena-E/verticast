import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavourites} from '../context/FavouriteContext';
import {useNotification} from '../context/NotificationContext';
import {sendCurrentWeatherReq} from '../data/api_req';

// widget component for displaying locations on the search page

const SearchWidget = ({
  temperature,
  location,
  id,
  navigation,
  widgetToScreenCom,
}) => {
  const {favourites, addFavourite, removeFavourite} = useFavourites();
  const {showNotification} = useNotification();
  const [currentData, setCurrentData] = useState({
    precipitation_probability: 44,
    temperature_180m: 7,
    visibility: 'High',
    weather_code: 61,
    wind_direction_180m: 'N',
    wind_speed_180m: 19,
  }); // default data

  useEffect(() => {
    const sendCurrentDataWithAPI = async () => {
      // fetch current weather data for given location
      try {
        const result = await sendCurrentWeatherReq(location);
        if (!('error' in result)) {
          setCurrentData(result);
        }
      } catch (err) {
        console.log('send error', err.message);
      }
    };
    sendCurrentDataWithAPI();
  }, []);

  const handleWidgetClick = () => {
    // navigate to preview weather page for given location
    navigation.navigate('WeatherLocation', {id, location});
  };

  const handleAddClick = () => {
    // display notification when add button clicked
    showNotification();
    // set appropriate message and colour of notification
    if (!favourites.some(obj => obj.id === id)) {
      addFavourite(id);
      widgetToScreenCom('Added to favourites!', '#ffb04f');
    } else {
      removeFavourite(id);
      widgetToScreenCom('Removed from favourites!', '#ff8282');
    }
  };

  return (
    <TouchableOpacity
      style={searchWidgetStyles.widgetContainer}
      onPress={handleWidgetClick}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 25, marginRight: 20}}>
          {Math.round(currentData.temperature_180m)}°
        </Text>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 23, fontStyle: 'italic'}} numberOfLines={2}>
            {location}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleAddClick} style={{}}>
        {favourites.some(obj => obj.id === id) ? (
          <Icon name="close" size={40} color="#322f38" />
        ) : (
          <Icon name="add-circle" size={40} color="#ffa70f" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const searchWidgetStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  textContainer: {
    maxWidth: '50%',
    overflow: 'hidden',
  },
});

export default SearchWidget;

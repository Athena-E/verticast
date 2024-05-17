import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavourites} from '../context/FavouriteContext';

const SearchWidget = ({temperature, location, navigation}) => {
  const {favourites, addFavourite, removeFavourite} = useFavourites();

  const handleWidgetClick = () => {
    navigation.navigate('WeatherLocation');
  };

  const handleAddClick = () => {
    addFavourite({id: 1, name: location});
  };

  return (
    <TouchableOpacity
      style={searchWidgetStyles.widgetContainer}
      onPress={handleWidgetClick}>
      <Text style={{fontSize: 40}}>{temperature}°</Text>
      <View style={{width: '50%'}}>
        <Text style={{fontSize: 30}} numberOfLines={2}>
          {location}
        </Text>
      </View>
      <TouchableOpacity onPress={handleAddClick}>
        <Icon name="add-circle-outline" size={40} color="#ffa70f" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const searchWidgetStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 235, 0.9)',
    borderRadius: 10,
    flex: 1,
    padding: 20,
    marginVertical: 5,
  },
  textContainer: {
    maxWidth: '50%',
    overflow: 'hidden',
  },
});

export default SearchWidget;

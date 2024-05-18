import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavourites} from '../context/FavouriteContext';

const SearchWidget = ({temperature, location, id, navigation}) => {
  const {favourites, addFavourite, removeFavourite} = useFavourites();
  const [addedToFav, setAddedToFav] = useState(false);

  const handleWidgetClick = () => {
    navigation.navigate('WeatherLocation', {id, location});
  };

  const handleAddClick = () => {
    if (!addedToFav) {
      addFavourite(id);
      setAddedToFav(true);
    } else {
      removeFavourite(id);
      setAddedToFav(false);
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
        <Text style={{fontSize: 40, marginRight: 20}}>{temperature}°</Text>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 30, fontStyle: 'italic'}} numberOfLines={2}>
            {location}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleAddClick} style={{}}>
        {addedToFav ? (
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

import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import SingleWeatherWidget from '../components/SingleWeatherWidget';
import BigTemperatureLabel from '../components/BigTemperatureLabel';
import DateSelectorDisplay from '../components/DateSelectorDisplay';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavourites} from '../context/FavouriteContext';
import {sendCurrentWeatherReq} from '../data/api_req';
import {weatherBackgrounds} from '../data/weatherCodes';
import {useNotification} from '../context/NotificationContext';
import {useFocusEffect} from '@react-navigation/native';
import {useDayCount} from '../context/DayCountContext';

const WeatherLocationScreen = ({route, navigation}) => {
  // Structure: Date selector, Big temperature + location, Weather widgets, Hourly weather scrollbar
  const {favourites, addFavourite, removeFavourite} = useFavourites();
  const {id, location} = route.params;
  const {dayOffset, resetOffset} = useDayCount();
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const [backImgName, setBackImgName] = useState(
    require('../assets/backgrounds/light-background.jpg'),
  );
  const [currentData, setCurrentData] = useState({
    precipitation_probability: 44,
    temperature_180m: 7,
    visibility: 'High',
    weather_code: 61,
    wind_direction_180m: 'NW',
    wind_speed_180m: 19,
  }); // default data
  const {notificationVisible, showNotification, slideAnim} = useNotification();
  const [notificationText, setNotificationText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const sendCurrentDataWithAPI = async () => {
        try {
          const result = await sendCurrentWeatherReq(location, dayOffset);
          if (!('error' in result)) {
            setCurrentData(result);
          }
          setBackImgName(weatherBackgrounds[currentData.weather_code]);
          setNotificationText('');
          //console.log('CURRENT DATA:', location, currentData); // log API response for debugging
        } catch (err) {
          console.log('send error', err.message);
        }
      };
      setIsScreenFocused(true);
      sendCurrentDataWithAPI();

      return () => {
        setIsScreenFocused(false);
      };
    }, [location, dayOffset]),
  );

  useFocusEffect(
    React.useCallback(() => {
      resetOffset();
    }, []),
  );

  const onBackClick = () => {
    navigation.goBack();
  };

  const onAddclick = () => {
    showNotification();
    if (!favourites.some(obj => obj.id === id)) {
      addFavourite(id);
      setNotificationText('Added to favourites!');
    } else {
      removeFavourite(id);
      setNotificationText('Removed from favourites!');
    }
  };

  return (
    <ImageBackground source={backImgName} style={homeStyles.background}>
      {/*notification dropdown*/}
      {notificationVisible && (
        <Animated.View
          style={[
            homeStyles.notification,
            {transform: [{translateY: slideAnim}]},
          ]}>
          <Text
            style={{
              color: 'rgba(50, 47, 56, 1)',
              fontSize: 20,
              fontFamily: 'Poppins-Regular',
            }}>
            {notificationText}
          </Text>
        </Animated.View>
      )}
      <View style={homeStyles.container}>
        <DateSelectorDisplay isHome={false} location={location} />
        <View style={homeStyles.contentContainer}>
          <BigTemperatureLabel
            temperature={Math.round(currentData.temperature_180m)}
            placeName={location}
          />
          <View style={homeStyles.widgetContainer}>
            <SingleWeatherWidget
              label="Wind Speed"
              value={Math.round(currentData.wind_speed_180m)}
              unit="km/h"
            />
            <SingleWeatherWidget
              label="Wind Direction"
              value={currentData.wind_direction_180m}
              unit=""
            />
            <SingleWeatherWidget
              label="Visibility"
              value={currentData.visibility}
              unit=""
            />
            <SingleWeatherWidget
              label="Precipitation"
              value={currentData.precipitation_probability}
              unit="%"
            />
          </View>
          <View>
            <HourlyWeatherDisplay
              isScreenFocused={isScreenFocused}
              location={location}
            />
          </View>
          <View
            style={{
              marginTop: -4,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignSelf: 'stretch',
              marginHorizontal: 80,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={onBackClick}>
              <Icon name="arrow-back-circle" size={50} color="#4099ff" />
              <Text style={{color: '#fff'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={onAddclick}>
              {favourites.some(obj => obj.id === id) ? (
                <Icon name="close-circle" size={50} color="#322f38" />
              ) : (
                <Icon name="add-circle" size={50} color="#ffa70f" />
              )}
              {favourites.some(obj => obj.id === id) ? (
                <Text style={{color: '#fff'}}>Remove</Text>
              ) : (
                <Text style={{color: '#fff'}}>Add</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const homeStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 10,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 20,
    backgroundColor: '#ffb04f',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default WeatherLocationScreen;

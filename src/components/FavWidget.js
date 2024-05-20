import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {sendCurrentWeatherReq} from '../data/api_req';
import {
  weatherCodes,
  weatherWarnings,
  weatherColors,
  weatherSymbols,
} from '../data/weatherCodes';
import {useHomeLocation} from '../context/HomeLocationContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavourites} from '../context/FavouriteContext';
import {useNotification} from '../context/NotificationContext';

const FavWidget = ({
  navigation,
  location,
  id,
  widgetToScreenCom,
  isScreenFocused,
}) => {
  const [currentData, setCurrentData] = useState({
    precipitation_probability: 44,
    temperature_180m: 7,
    visibility: 'High',
    weather_code: 61,
    wind_direction_180m: 'N',
    wind_speed_180m: 19,
  }); // default data
  const {changeHome} = useHomeLocation();
  const {removeFavourite} = useFavourites();
  const {showNotification} = useNotification();

  const handleWidgetClick = () => {
    // sets new home location when user clicks on favourite widget
    changeHome(location);
    navigation.navigate('Home');
  };

  const handleXClick = () => {
    // removes widget from favourites when close button clicked
    showNotification();
    widgetToScreenCom('Removed from favourites!', id);
    removeFavourite(id);
  };

  useEffect(() => {
    const sendCurrentDataWithAPI = async () => {
      // fetch data for given location
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
  }, [isScreenFocused]);

  return (
    <TouchableOpacity
      style={favWidgetStyles.widgetContainer}
      onPress={handleWidgetClick}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <View style={{marginRight: 15}}>
              <Text style={{fontSize: 20, fontWeight: 'semibold'}}>
                {weatherCodes[currentData.weather_code]}
              </Text>
              <Image
                source={weatherSymbols[currentData.weather_code]}
                resizeMode="contain"
                style={favWidgetStyles.weatherImage}
              />
            </View>
          </View>
          {/*vertical divider*/}
          <View style={favWidgetStyles.verDivider} />
          <View style={{width: '50%'}}>
            <View style={{marginLeft: 20}}>
              {/*location name*/}
              <View style={{marginBottom: 0}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {location}
                </Text>
              </View>
              {/*show wind speed*/}
              <View style={{marginBottom: 0}}>
                <Text style={{fontSize: 20}}>
                  {Math.round(currentData.wind_speed_180m)}
                  <Text style={{fontSize: 15}}>mph</Text>
                </Text>
              </View>
              {/*show temperature*/}
              <View style={{marginBottom: 0}}>
                <Text style={{fontWeight: 'bold', fontSize: 50}}>
                  {Math.round(currentData.temperature_180m)}°C
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/*weather warning box*/}
        <View
          style={[
            favWidgetStyles.warningBox,
            {backgroundColor: `${weatherColors[currentData.weather_code]}`},
          ]}>
          <Text style={{fontSize: 18, fontWeight: 'semibold'}}>
            {weatherWarnings[currentData.weather_code]}
          </Text>
        </View>
        {/*close button*/}
        <TouchableOpacity onPress={handleXClick}>
          <Icon name={'close'} size={40} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const favWidgetStyles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'rgba(255, 250, 235, 0.9)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  verDivider: {
    height: '100%',
    width: 2,
    backgroundColor: '#000',
    marginHorizontal: 0,
  },
  weatherImage: {
    height: 95,
    width: 120,
    alignSelf: 'center',
  },
  warningBox: {
    marginTop: 15,
    marginBottom: 8,
    backgroundColor: '#d1b152',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 1,
    marginRight: 10,
  },
});

export default FavWidget;

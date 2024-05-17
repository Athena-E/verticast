import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import SingleWeatherWidget from '../components/SingleWeatherWidget';
import BigTemperatureLabel from '../components/BigTemperatureLabel';
import DateSelectorDisplay from '../components/DateSelectorDisplay';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavourites} from '../context/FavouriteContext';

// Home Screen page
// TODO: will make this more general i.e. general weather display, not just Home Screen

const WeatherLocationScreen = ({navigation}) => {
  // Structure: Date selector, Big temperature + location, Weather widgets, Hourly weather scrollbar
  const {favourites, addFavourite, removeFavourite} = useFavourites();

  const onBackClick = () => {
    navigation.goBack();
  };

  const onAddclick = () => {
    addFavourite({id: 1, name: 'Ben Nevis'});
  };

  // const {locations} = useLocations();
  // const [weatherData, setWeatherData] = useState([]);
  //
  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const data = await Promise.all(
  //       locations.map(async location => {
  //         const response = await fetch(
  //           `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location.name}`,
  //         );
  //         const result = await response.json();
  //         return {...location, weather: result};
  //       }),
  //     );
  //     setWeatherData(data);
  //   };

  //   fetchWeatherData();
  // }, [locations]);

  return (
    <ImageBackground
      source={require('../assets/snow-background2.jpg')}
      style={homeStyles.background}>
      <View style={homeStyles.container}>
        <DateSelectorDisplay />
        <View style={homeStyles.contentContainer}>
          <BigTemperatureLabel temperature={20} placeName="Ben Nevis" />
          <View style={homeStyles.widgetContainer}>
            <SingleWeatherWidget label="Wind Speed" value={10} unit="mph" />
            <SingleWeatherWidget label="Wind Direction" value="NNE" unit="" />
            <SingleWeatherWidget label="Visibility" value={'High'} unit="" />
            <SingleWeatherWidget label="Precipitation" value={'25%'} unit="" />
          </View>
          <View>
            <HourlyWeatherDisplay />
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
              <Icon
                name="arrow-back-circle-outline"
                size={50}
                color="#4099ff"
              />
              <Text style={{color: '#fff'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={onAddclick}>
              <Icon name="add-circle-outline" size={50} color="#ffa70f" />
              <Text style={{color: '#fff'}}>Add</Text>
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
});

export default WeatherLocationScreen;

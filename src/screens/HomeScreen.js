import React, {useEffect, useState} from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';
import SingleWeatherWidget from '../components/SingleWeatherWidget';
import BigTemperatureLabel from '../components/BigTemperatureLabel';
import DateSelectorDisplay from '../components/DateSelectorDisplay';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay';
import styles from '../utils/styles';
import {useBackground} from '../context/BackgroundsContext';

const HomeScreen = ({navigation}) => {
  // Structure: Date selector, Big temperature + location, Weather widgets, Hourly weather scrollbar
  const {getBackground} = useBackground();
  const [tempData, setTempData] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [descr, setDescr] = useState(null);
  const [backImgName, setBackImgName] = useState(
    require('../assets/backgrounds/light-background.jpg'),
  );

  useEffect(() => {
    fetchTempData();
  }, []);

  // api request
  const fetchTempData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/data'); // MUST use 10.0.2.2 android localhost
      const responseData = await response.json();
      setTempData(responseData.temperature);
      setPlaceData(responseData.location);
      setDescr(responseData.descr);
      setBackImgName(getBackground(descr));
      //console.log(backImgName);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ImageBackground source={backImgName} style={styles.background}>
      <View style={homeStyles.container}>
        <DateSelectorDisplay />
        <View style={homeStyles.contentContainer}>
          <BigTemperatureLabel temperature={tempData} placeName={placeData} />
          <View style={homeStyles.widgetContainer}>
            <SingleWeatherWidget label="Wind Speed" value={10} unit="mph" />
            <SingleWeatherWidget label="Wind Direction" value="NNE" unit="" />
            <SingleWeatherWidget label="Visibility" value={'High'} unit="" />
            <SingleWeatherWidget label="Precipitation" value={'25%'} unit="" />
          </View>
          <View>
            <HourlyWeatherDisplay />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

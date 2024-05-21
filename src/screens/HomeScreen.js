import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Animated,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SingleWeatherWidget from '../components/SingleWeatherWidget';
import BigTemperatureLabel from '../components/BigTemperatureLabel';
import DateSelectorDisplay from '../components/DateSelectorDisplay';
import HourlyWeatherDisplay from '../components/HourlyWeatherDisplay';
import styles from '../utils/styles';
import {sendCurrentWeatherReq} from '../data/api_req';
import {useNotification} from '../context/NotificationContext';
import {useHomeLocation} from '../context/HomeLocationContext';
import {useFocusEffect} from '@react-navigation/native';
import {
  weatherBackgrounds,
  weatherClimbingRec,
  weatherCodesLong,
  weatherColors,
  weatherExtraRec,
  weatherSafetyRatings,
  weatherWarnings,
} from '../data/weatherCodes';
import Icon from 'react-native-vector-icons/Ionicons';
import WeatherRecWidget from '../components/WeatherRecWidget';
import ScaleComponent from '../components/ScaleComponent';
import ListWeatherData from '../components/ListWeatherData';

const HomeScreen = () => {
  const {homeLocation} = useHomeLocation();
  const [backImgName, setBackImgName] = useState(
    require('../assets/backgrounds/light-background.jpg'),
  ); // set initial default background image
  const [currentData, setCurrentData] = useState({
    precipitation_probability: 44,
    temperature_180m: 7,
    visibility: 'High',
    weather_code: 1,
    wind_direction_180m: 'N',
    wind_speed_180m: 19,
  }); // default data
  const {notificationVisible, slideAnim} = useNotification();
  const [notificationText, setNotificationText] = useState('');
  const bobbingAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isScreenFocused, setIsScreenFocused] = useState(false);

  const handleScroll = event => {
    // handle scroll event and set indicator when user is near bottom of the screen
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const triggerPoint = contentSize.height * 0.8; // Adjust the percentage as needed
    setIsNearBottom(layoutMeasurement.height + contentOffset.y >= triggerPoint);
  };

  const scrollToBottom = () => {
    // scroll animation to the bottom of the screen
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true, duration: 2000});
    }
  };

  const scrollToTop = () => {
    // scroll animation to the top of the screen
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
        duration: 1500,
      });
    }
  };

  const startAtTop = () => {
    // method to start user at top of screen when navigated to Home
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  };

  // animation method taken from previous React project (ae537)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobbingAnim, {
          toValue: -10, // Move up by 10 units
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bobbingAnim, {
          toValue: 0, // Move back to original position
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bobbingAnim]);

  // trigger API request on screen focus
  useFocusEffect(
    React.useCallback(() => {
      const sendCurrentDataWithAPI = async () => {
        try {
          const result = await sendCurrentWeatherReq(homeLocation);
          if (!('error' in result)) {
            setCurrentData(result);
          }
          setBackImgName(weatherBackgrounds[currentData.weather_code]);
          setNotificationText('');
          console.log('CURRENT DATA:', homeLocation, currentData); // log API response for debugging
        } catch (err) {
          console.log('send error', err.message);
        }
      };
      setIsScreenFocused(true);
      sendCurrentDataWithAPI();

      return () => {
        setIsScreenFocused(false);
      };
    }, [homeLocation]),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     startAtTop();
  //   }, []),
  // );

  const buttonToScreenCom = text => {
    // button to trigger notification for downloads on DateSelector component
    setNotificationText(text);
  };

  return (
    <ImageBackground source={backImgName} style={styles.background}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}>
        <View style={homeStyles.container}>
          {/*notification dropdown*/}
          {notificationVisible && notificationText !== '' && (
            <Animated.View
              style={[
                homeStyles.notification,
                {transform: [{translateY: slideAnim}]},
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Poppins-Regular',
                }}>
                {notificationText}
              </Text>
            </Animated.View>
          )}
          <DateSelectorDisplay
            buttonToScreenCom={buttonToScreenCom}
            location={homeLocation}
          />
          <View style={homeStyles.contentContainer}>
            <BigTemperatureLabel
              temperature={Math.round(currentData.temperature_180m)}
              placeName={homeLocation}
            />
            {/*four main weather metric widgets*/}
            <View style={homeStyles.widgetContainer}>
              <SingleWeatherWidget
                label="Wind Speed"
                value={Math.round(currentData.wind_speed_180m)}
                unit="mph"
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
                location={homeLocation}
              />
            </View>
            <Animated.View
              style={[
                homeStyles.bobbingView,
                {transform: [{translateY: bobbingAnim}]},
              ]}>
              <TouchableOpacity
                onPress={isNearBottom ? scrollToTop : scrollToBottom}>
                {isNearBottom ? (
                  <Icon name={'chevron-up'} size={50} />
                ) : (
                  <Icon name={'chevron-down'} size={50} />
                )}
              </TouchableOpacity>
            </Animated.View>
            <WeatherRecWidget
              descr={weatherCodesLong[currentData.weather_code]}
              warning={weatherWarnings[currentData.weather_code]}
              widgetColor={weatherColors[currentData.weather_code]}
              weatherRec={weatherExtraRec[currentData.weather_code]}
              weatherClimbingRec={weatherClimbingRec[currentData.weather_code]}
            />
            <ScaleComponent
              scaleValue={weatherSafetyRatings[currentData.weather_code]}
            />
            <ListWeatherData />
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center',
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
    backgroundColor: '#6380ff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bobbingView: {},
});

export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNotification} from '../context/NotificationContext';
import {sendDownloadReq} from '../data/api_req';
import {useDayCount} from '../context/DayCountContext';
import {useFocusEffect} from '@react-navigation/native';

// Component for selecting the date on a location's weather page
// Includes download button

const DateSelectorDisplay = ({buttonToScreenCom, isHome = true, location}) => {
  // initialise dates
  const [currentDate, setCurrentDate] = useState(new Date()); // today's date
  const [previousDate, setPreviousDate] = useState(() => {
    const previous = new Date(currentDate);
    previous.setDate(previous.getDate() - 1);
    return previous;
  }); // set yesterday's date
  const [nextDate, setNextDate] = useState(() => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    return next;
  }); // set tomorrow's date
  const [isDownloaded, setIsDownloaded] = useState(false);
  const {showNotification} = useNotification();
  const {changeOffset} = useDayCount();

  useFocusEffect(
    React.useCallback(() => {
      setCurrentDate(new Date());
      setPreviousDate(() => {
        const previous = new Date(currentDate);
        previous.setDate(previous.getDate() - 1);
        return previous;
      });
      setNextDate(() => {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + 1);
        return next;
      });
    }, []),
  );

  const formatLongDate = date => {
    // return date as string unless current date is the same as today's date
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }
    // format date as day, month, DD (no year)
    return date.toDateString().slice(0, -5);
  };

  const formatShortDate = date => {
    // format date as DD/MM for arrow button labels
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const goToPreviousDay = () => {
    // update dates when user presses button to go to previous day
    const newPreviousDay = new Date(previousDate);
    newPreviousDay.setDate(newPreviousDay.getDate() - 1);
    setNextDate(currentDate);
    setCurrentDate(previousDate);
    setPreviousDate(new Date(newPreviousDay));
    changeOffset(-1);
  };

  const goToNextDay = () => {
    // update dates when user  presses button to go to next day
    const newNextDay = new Date(nextDate);
    newNextDay.setDate(newNextDay.getDate() + 1);
    setPreviousDate(currentDate);
    setCurrentDate(nextDate);
    setNextDate(new Date(newNextDay));
    changeOffset(1);
  };

  const onDownloadPress = () => {
    // triggers dropdown notification
    showNotification();
    setIsDownloaded(!isDownloaded);
    buttonToScreenCom('Weather data downloaded');
    // sends API request to download location's weather data
    sendDownloadReq(location);
  };

  return (
    <View style={DateStyles.container}>
      {/*Arrow to go back one day*/}
      <TouchableOpacity onPress={goToPreviousDay}>
        <Icon name="arrow-back-circle" size={40} />
        <Text style={{fontFamily: 'Poppins-Medium'}}>
          {formatShortDate(previousDate)}
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        {/*date label*/}
        <Text style={DateStyles.label}>{formatLongDate(currentDate)}</Text>
        {/*download button*/}
        {isHome && (
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={onDownloadPress}
            disabled={isDownloaded}>
            {isDownloaded ? (
              <Icon name={'checkmark-circle'} size={40} />
            ) : (
              <Icon name={'arrow-down-circle'} size={40} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {/*Arrow to go forward one day*/}
      <TouchableOpacity onPress={goToNextDay}>
        <Icon name="arrow-forward-circle" size={40} />
        <Text style={{fontFamily: 'Poppins-Medium'}}>
          {formatShortDate(nextDate)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DateStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default DateSelectorDisplay;

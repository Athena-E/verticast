import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Component for selecting the date
// TODO: limit number of days user can go back/forwards

const DateSelectorDisplay = () => {
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
  };

  const goToNextDay = () => {
    // update dates when user  presses button to go to next day
    const newNextDay = new Date(nextDate);
    newNextDay.setDate(newNextDay.getDate() + 1);
    setPreviousDate(currentDate);
    setCurrentDate(nextDate);
    setNextDate(new Date(newNextDay));
  };

  return (
    <View style={DateStyles.container}>
      <TouchableOpacity onPress={goToPreviousDay}>
        <Icon name="arrow-back-circle" size={40} />
        <Text style={{fontFamily: 'Poppins-Medium'}}>
          {formatShortDate(previousDate)}
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text style={DateStyles.label}>{formatLongDate(currentDate)}</Text>
        <TouchableOpacity style={{marginLeft: 10}}>
          <Icon name={'arrow-down-circle'} size={40} />
        </TouchableOpacity>
      </View>
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

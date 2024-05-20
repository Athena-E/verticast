import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// component for weather overview and recommendations on main weather page

const WeatherRecWidget = ({
  descr,
  warning,
  widgetColor,
  weatherRec,
  weatherClimbingRec,
}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <View style={[widgetStyles.widget, {backgroundColor: widgetColor}]}>
        <Text style={widgetStyles.textContainer}>{descr}</Text>
        <Text style={{fontSize: 20}}>{warning}</Text>
        <Text style={{fontSize: 20, color: '#fff'}}>{weatherClimbingRec}</Text>
        <Text style={{fontSize: 20, color: '#fff'}}>
          <Text style={{fontFamily: 'Poppins-LightItalic', fontSize: 18}}>
            {'Recommended: '}
          </Text>
          {weatherRec}
        </Text>
      </View>
    </View>
  );
};

const widgetStyles = StyleSheet.create({
  widget: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    textAlign: 'left',
    fontSize: 30,
    color: '#000',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 40,
    color: '#000',
  },
  unit: {
    fontSize: 20,
    color: '#000',
  },
});

export default WeatherRecWidget;

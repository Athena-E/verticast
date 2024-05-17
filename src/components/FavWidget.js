import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const FavWidget = ({navigation}) => {
  const handleWidgetClick = () => {
    navigation.navigate('Home');
  };
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
              <Text style={{fontSize: 20, fontWeight: 'semibold'}}>Cloudy</Text>
              <Image
                source={require('../assets/half-sun.png')}
                resizeMode="contain"
                style={favWidgetStyles.weatherImage}
              />
            </View>
          </View>
          <View style={favWidgetStyles.verDivider} />
          <View style={{width: '50%'}}>
            <View style={{marginLeft: 20}}>
              <View style={{marginBottom: 0}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Ben Nevis
                </Text>
              </View>
              <View style={{marginBottom: 0}}>
                <Text style={{fontSize: 20}}>
                  4 <Text style={{fontSize: 15}}>mph</Text>
                </Text>
              </View>
              <View style={{marginBottom: 0}}>
                <Text style={{fontWeight: 'bold', fontSize: 50}}>22°C</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={favWidgetStyles.warningBox}>
        <Text style={{fontSize: 18, fontWeight: 'semibold'}}>
          High winds warning!
        </Text>
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
    shadowColor: '#000',
    elevation: 15,
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
    backgroundColor: '#ff775c',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default FavWidget;

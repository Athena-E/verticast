import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// component to display safety rating of location 1-5

const ScaleComponent = ({scaleValue}) => {
  const [selectedScale, setSelectedScale] = useState();
  const scaleColors = {
    1: '#ff7373',
    2: '#ff9a78',
    3: '#ffe278',
    4: '#e2ff78',
    5: '#a3ff78',
  };

  useEffect(() => {
    // update scale value
    setSelectedScale(scaleValue);
  }, [scaleValue]);

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={[styles.widget, {backgroundColor: 'rgba(96, 126, 156, 0.6)'}]}>
        <View style={styles.container}>
          <Text style={styles.label}>Safety rating</Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, marginRight: 3}}>
              danger
            </Text>
            <View style={styles.scaleContainer}>
              {[1, 2, 3, 4, 5].map(scale => (
                <View
                  key={scale}
                  style={[
                    styles.scaleOption,
                    selectedScale === scale && {
                      backgroundColor: scaleColors[selectedScale],
                    },
                  ]}>
                  <Text style={styles.scaleText}>{scale}</Text>
                </View>
              ))}
            </View>
            <Text style={{color: '#000', fontSize: 15, marginLeft: 3}}>
              safe
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  scaleContainer: {
    flexDirection: 'row',
  },
  scaleOption: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  selectedScale: {
    backgroundColor: '#d1b152',
  },
  scaleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  widget: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    marginVertical: 10,
  },
});

export default ScaleComponent;

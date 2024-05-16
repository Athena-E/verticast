import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import FavWidget from '../components/FavWidget';

const FavouritesScreen = ({navigation}) => {
  return (
    <View style={favStyles.contentContainer}>
      <View style={favStyles.headingBox}>
        <Text style={favStyles.favHeadingText}>Favourites</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={favStyles.contentBox}>
          <View
            style={{
              marginBottom: 10,
            }}>
            <Text style={favStyles.subTitleText}>Saved locations</Text>
          </View>
          <FavWidget navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

const favStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4abbe0',
  },
  headingBox: {
    marginTop: 20,
  },
  favHeadingText: {
    fontSize: 50,
    fontWeight: 'semibold',
  },
  subTitleText: {
    fontSize: 25,
    fontStyle: 'italic',
  },
  contentBox: {
    marginTop: 20,
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 20,
  },
});

export default FavouritesScreen;

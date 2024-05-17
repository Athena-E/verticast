import React from 'react';
import {View, Button, Text, StyleSheet, ImageBackground} from 'react-native';
import FavWidget from '../components/FavWidget';
import styles from '../utils/styles';

const FavouritesScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/fav-background.jpg')}
      style={styles.background}>
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
    </ImageBackground>
  );
};

const favStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headingBox: {
    marginTop: 20,
  },
  favHeadingText: {
    fontSize: 50,
    fontFamily: 'Poppins-MediumItalic',
  },
  subTitleText: {
    fontSize: 25,
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

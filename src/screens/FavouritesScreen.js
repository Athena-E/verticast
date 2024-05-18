import React from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';
import FavWidget from '../components/FavWidget';
import styles from '../utils/styles';
import {useFavourites} from '../context/FavouriteContext';

const FavouritesScreen = ({navigation}) => {
  const {favourites, addFavourite, removeFavourite} = useFavourites();

  const renderFavs = ({item}) => (
    <FavWidget location={item.name} navigation={navigation} />
  );

  return (
    <ImageBackground
      source={require('../assets/backgrounds/fav-background.jpg')}
      style={styles.background}>
      <View style={favStyles.contentContainer}>
        <View style={favStyles.headingBox}>
          <Text style={favStyles.favHeadingText}>Favourites</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={favStyles.contentBox}>
            <View style={{marginBottom: 10}}>
              <Text style={favStyles.subTitleText}>Saved locations</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <FlatList
                data={favourites}
                renderItem={renderFavs}
                keyExtractor={item => item.id}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
                contentContainerStyle={{marginBottom: 20}}
              />
            </View>
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
    paddingBottom: 130,
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

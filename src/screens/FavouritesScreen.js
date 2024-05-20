import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import FavWidget from '../components/FavWidget';
import styles from '../utils/styles';
import {useFavourites} from '../context/FavouriteContext';
import {useNotification} from '../context/NotificationContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

// Favourite screen with user's saved locations

const FavouritesScreen = ({navigation}) => {
  const {favourites, addFavourite} = useFavourites();
  const {notificationVisible, slideAnim} = useNotification();
  const [notificationText, setNotificationText] = useState('');
  const [deletedId, setDeletedId] = useState(); // keep record of deleted location
  const [isScreenFocused, setIsScreenFocused] = useState(false);

  useFocusEffect(
    // method to force re-render on screen focus
    useCallback(() => {
      setIsScreenFocused(true);

      return () => {
        setIsScreenFocused(false);
      };
    }, []),
  );

  const widgetToScreenCom = (text, id, color) => {
    // send notification data to parent main screen component
    setNotificationText(text);
    setDeletedId(id);
  };

  const renderFavs = ({item}) => (
    // method to dynamically render locations in user's favourites
    <FavWidget
      location={item.name}
      navigation={navigation}
      id={item.id}
      widgetToScreenCom={widgetToScreenCom}
      isScreenFocused={isScreenFocused}
    />
  );

  const handleUndoClick = () => {
    // restore deleted location back to favourites
    if (deletedId) {
      addFavourite(deletedId);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/fav-background.jpg')}
      style={styles.background}>
      {/*notification dropdown*/}
      {notificationVisible && notificationText !== '' && (
        <Animated.View
          style={[
            favStyles.notification,
            {transform: [{translateY: slideAnim}]},
          ]}>
          <TouchableOpacity style={{marginRight: 30}} onPress={handleUndoClick}>
            <Icon name={'arrow-undo'} size={30} />
            <Text>undo</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'rgba(50, 47, 56, 1)',
              fontSize: 20,
              fontFamily: 'Poppins-Regular',
            }}>
            {notificationText}
          </Text>
        </Animated.View>
      )}
      <View style={favStyles.contentContainer}>
        <View style={favStyles.headingBox}>
          {/*Main heading*/}
          <Text style={favStyles.favHeadingText}>Favourites</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={favStyles.contentBox}>
            <View style={{marginBottom: 10}}>
              {/*sub heading*/}
              <Text style={favStyles.subTitleText}>Saved locations</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              {/*list of saved location widgets*/}
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
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 20,
    backgroundColor: '#ff8282',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
  },
});

export default FavouritesScreen;

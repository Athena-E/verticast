import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import SearchWidget from '../components/SearchWidget';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocations} from '../context/LocationsContext';
import styles from '../utils/styles';
import {useRecommended} from '../context/RecommendedContext';
import {useNotification} from '../context/NotificationContext';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const textInputRef = useRef(null);
  const {locations} = useLocations();
  const {recLocations} = useRecommended();
  const {notificationVisible, showNotification, slideAnim} = useNotification();
  const SEARCHDATA = locations;
  const [notificationText, setNotificationText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [notificationColour, setNotificationColour] = useState('#d1b152');

  const widgetToScreenCom = (text, colour) => {
    setNotificationText(text);
    setNotificationColour(colour);
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = SEARCHDATA.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    if (text === '' || !filtered.length) {
      setNoResults(true);
      return setFilteredData([]);
    }
    setNoResults(false);
    setFilteredData(filtered);
  };

  const handleOffSearch = () => {
    setIsSearching(false);
  };

  const handleOnSearch = () => {
    setIsSearching(true);
  };

  const handleSearchButtonPress = () => {
    textInputRef.current.focus();
  };

  const renderSearchResult = ({item}) => (
    <SearchWidget
      location={item.name}
      temperature={30}
      id={item.id}
      navigation={navigation}
      style={searchStyles.widgetContainer}
      widgetToScreenCom={widgetToScreenCom}
    />
  );

  return (
    <ImageBackground
      source={require('../assets/backgrounds/search-background.jpg')}
      style={styles.background}>
      <View style={searchStyles.contentContainer}>
        {/*notification dropdown*/}
        {notificationVisible && (
          <Animated.View
            style={[
              searchStyles.notification,
              {
                transform: [{translateY: slideAnim}],
                backgroundColor: notificationColour,
              },
            ]}>
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
        <Text style={searchStyles.titleText}>Where would you like to go?</Text>
        <View style={searchStyles.searchBar}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={handleSearchButtonPress}>
            <Icon name="search" size={25} color={'#fff'} />
          </TouchableOpacity>
          <TextInput
            ref={textInputRef}
            style={searchStyles.searchTextBox}
            placeholder={'Type here...'}
            onChangeText={handleSearch}
            value={searchQuery}
            onBlur={handleOffSearch}
            onFocus={handleOnSearch}
            cursorColor={'#fff'}
            placeholderTextColor={'#fff'}
          />
        </View>
        {
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={searchStyles.searchContainer}>
              <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {isSearching || searchQuery !== ''
                    ? 'Search results'
                    : 'Recommended locations'}
                </Text>
              </View>
              {isSearching || searchQuery !== '' ? (
                /*search results*/
                <View style={searchStyles.widgetContainer}>
                  {noResults && searchQuery !== '' ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          flexDirection: 'row',
                          textAlign: 'center',
                          marginTop: 30,
                        }}>
                        Sorry, we don't know where that is!
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          flexDirection: 'row',
                          textAlign: 'left',
                          marginTop: 20,
                          paddingLeft: 10,
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                        }}>
                        Explore recommended:
                      </Text>
                      <FlatList
                        data={recLocations}
                        renderItem={renderSearchResult}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1}}
                        contentContainerStyle={{marginBottom: 50}}
                      />
                    </View>
                  ) : (
                    <FlatList
                      data={filteredData}
                      renderItem={renderSearchResult}
                      keyExtractor={item => item.id}
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                    />
                  )}
                </View>
              ) : (
                /*recommended locations*/
                <View style={searchStyles.widgetContainer}>
                  <FlatList
                    data={recLocations}
                    renderItem={renderSearchResult}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    contentContainerStyle={{marginBottom: 20}}
                  />
                </View>
              )}
            </View>
          </View>
        }
      </View>
    </ImageBackground>
  );
};

const searchStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(50, 47, 56, 0.6)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },
  searchTextBox: {
    marginLeft: 11,
    fontSize: 18,
    flexDirection: 'row',
    flex: 1,
    color: '#fff',
  },
  titleText: {
    fontSize: 35,
    textAlign: 'center',
    marginHorizontal: 50,
    marginVertical: 30,
    fontFamily: 'Poppins-MediumItalic',
  },
  searchContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 20,
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  widgetContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 0,
    marginBottom: 140,
    backgroundColor: 'rgba(255, 250, 235, 0.7)',
    borderRadius: 10,
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 20,
    // backgroundColor: '#ffb04f',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default SearchScreen;

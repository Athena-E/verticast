import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import SearchWidget from '../components/SearchWidget';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocations} from '../context/LocationsContext';
import styles from '../utils/styles';
import {useRecommended} from '../context/RecommendedContext';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const textInputRef = useRef(null);
  const {locations} = useLocations();
  const {recLocations} = useRecommended();
  const SEARCHDATA = locations;

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = SEARCHDATA.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    if (text === '') {
      return setFilteredData([]);
    }
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
    />
  );

  return (
    <ImageBackground
      source={require('../assets/backgrounds/search-background.jpg')}
      style={styles.background}>
      <View style={searchStyles.contentContainer}>
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
                  <FlatList
                    data={filteredData}
                    renderItem={renderSearchResult}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  />
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
    paddingBottom: 130,
  },
});

export default SearchScreen;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import SearchWidget from '../components/SearchWidget';
import Icon from 'react-native-vector-icons/Ionicons';

const SEARCHDATA = [
  {id: '1', name: 'Ben Nevis'},
  {id: '2', name: 'Ben Ten'},
  {id: '3', name: 'Ben Browning'},
  {id: '4', name: 'Scaffel Pike'},
];

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const textInputRef = useRef(null);

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
      navigation={navigation}
    />
  );

  return (
    <View style={searchStyles.contentContainer}>
      <Text style={searchStyles.titleText}>Where would you like to go?</Text>
      <View style={searchStyles.searchBar}>
        <TouchableOpacity
          style={searchStyles.searchButton}
          onPress={handleSearchButtonPress}>
          <Icon name="search" size={25} />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          style={searchStyles.searchTextBox}
          placeholder={'Type here...'}
          onChangeText={handleSearch}
          value={searchQuery}
          onBlur={handleOffSearch}
          onFocus={handleOnSearch}
        />
      </View>
      {
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={searchStyles.recContainer}>
            <View style={searchStyles.recLabelContainer}>
              <Text style={searchStyles.recLabel}>
                {isSearching || searchQuery !== ''
                  ? 'Search results'
                  : 'Recommended locations'}
              </Text>
            </View>
            {isSearching || searchQuery !== '' ? (
              <FlatList
                data={filteredData}
                renderItem={renderSearchResult}
                keyExtractor={item => item.id}
                scrollEnabled={true}
              />
            ) : (
              <SearchWidget
                temperature={14}
                location={'Ben Nevis'}
                navigation={navigation}
              />
            )}
          </View>
        </View>
      }
    </View>
  );
};

const searchStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4abbe0',
  },
  searchBar: {
    borderColor: '#000',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },
  searchTextBox: {
    marginLeft: 11,
    fontSize: 15,
    flexDirection: 'row',
    flex: 1,
  },
  searchButton: {
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    marginHorizontal: 50,
    marginVertical: 30,
    fontWeight: 'semibold',
  },
  recLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 20,
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  recLabelContainer: {
    marginBottom: 10,
  },
});

export default SearchScreen;

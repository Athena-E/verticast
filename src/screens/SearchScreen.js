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
  const [filteredData, setFilteredData] = useState(SEARCHDATA);
  const textInputRef = useRef(null);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  const handleSearch = text => {
    setSearchQuery(text);
    console.log(text);
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
    <SearchWidget location={item.name} temperature={30} />
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
      {!isSearching && (
        <View style={searchStyles.recContainer}>
          <View style={searchStyles.recLabelContainer}>
            <Text style={searchStyles.recLabel}>Recommended locations</Text>
          </View>
          <SearchWidget temperature={14} location={'Ben Nevis'} />
        </View>
      )}
      {isSearching && (
        <View style={searchStyles.recContainer}>
          <View style={searchStyles.recLabelContainer}>
            <Text style={searchStyles.recLabel}>Search results</Text>
          </View>
          <FlatList
            data={filteredData}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id}
            scrollEnabled={true}
          />
        </View>
      )}
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
    height: 60,
    borderColor: '#000',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 30,
    width: '90%',
  },
  searchTextBox: {
    marginLeft: 11,
    width: '85%',
    fontSize: 15,
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
    width: '90%',
    marginTop: 20,
  },
  recLabelContainer: {
    width: '100%',
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
});

export default SearchScreen;

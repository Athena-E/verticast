import React from 'react';
import {View, Button, Text} from 'react-native';

const FavouritesScreen = ({navigation}) => {
  return (
    <View>
      <Text>Hello, Home</Text>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
};

export default FavouritesScreen;

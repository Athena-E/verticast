import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen
          name={'Favourites'}
          component={FavouritesScreen}
          options={{
            tabBarIcon: () => <Icon name="star" size={30} color="#ffa70f" />,
          }}
        />
        <Tab.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            tabBarIcon: () => <Icon name="home" size={30} color="#000" />,
          }}
        />
        <Tab.Screen
          name={'Search'}
          component={SearchScreen}
          options={{
            tabBarIcon: () => <Icon name="search" size={30} color="#000" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

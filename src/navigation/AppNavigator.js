import FavouritesScreen from '../screens/FavouritesScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import WeatherLocationScreen from '../screens/WeatherLocationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
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
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Tabs'}>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WeatherLocation"
          component={WeatherLocationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

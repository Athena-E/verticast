import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {FavouritesProvider} from './src/context/FavouriteContext';
import {LocationsProvider} from './src/context/LocationsContext';

const App = () => {
  return (
    <LocationsProvider>
      <FavouritesProvider>
        <AppNavigator />
      </FavouritesProvider>
    </LocationsProvider>
  );
};

export default App;

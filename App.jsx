import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {FavouritesProvider} from './src/context/FavouriteContext';
import {LocationsProvider} from './src/context/LocationsContext';
import {BackgroundProvider} from './src/context/BackgroundsContext';
import {RecommendedProvider} from './src/context/RecommendedContext';

const App = () => {
  return (
    <BackgroundProvider>
      <LocationsProvider>
        <RecommendedProvider>
          <FavouritesProvider>
            <AppNavigator />
          </FavouritesProvider>
        </RecommendedProvider>
      </LocationsProvider>
    </BackgroundProvider>
  );
};

export default App;

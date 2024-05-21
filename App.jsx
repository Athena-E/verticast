import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {FavouritesProvider} from './src/context/FavouriteContext';
import {LocationsProvider} from './src/context/LocationsContext';
import {RecommendedProvider} from './src/context/RecommendedContext';
import {NotificationProvider} from './src/context/NotificationContext';
import {HomeLocationProvider} from './src/context/HomeLocationContext';
import {DayCountProvider} from './src/context/DayCountContext';

const App = () => {
  return (
    <DayCountProvider>
      <HomeLocationProvider>
        <NotificationProvider>
          <LocationsProvider>
            <RecommendedProvider>
              <FavouritesProvider>
                <AppNavigator />
              </FavouritesProvider>
            </RecommendedProvider>
          </LocationsProvider>
        </NotificationProvider>
      </HomeLocationProvider>
    </DayCountProvider>
  );
};

export default App;

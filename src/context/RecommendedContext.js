import React, {createContext, useContext} from 'react';
import {useLocations} from './LocationsContext';

const RecommendedContext = createContext();

export const RecommendedProvider = ({children}) => {
  const recLocationIds = [1, 2, 3]; // put recommended location ids here
  const {locations} = useLocations();
  const recLocations = locations.filter(obj => recLocationIds.includes(obj.id));

  return (
    <RecommendedContext.Provider value={{recLocations}}>
      {children}
    </RecommendedContext.Provider>
  );
};

export const useRecommended = () => useContext(RecommendedContext);

import React, {createContext, useState, useContext, useEffect} from 'react';
import staticLocations from '../data/staticLocations';

// hook to manage and share location names

const LocationsContext = createContext();

export const LocationsProvider = ({children}) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Set static locations on initial load
    setLocations(staticLocations);
  }, []);

  return (
    <LocationsContext.Provider value={{locations}}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => useContext(LocationsContext);

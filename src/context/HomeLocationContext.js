import React, {createContext, useState, useContext} from 'react';

// hook to manage current default home location set by user

const HomeLocationContext = createContext();

export const HomeLocationProvider = ({children}) => {
  const [homeLocation, setHomeLocation] = useState('Ben Nevis');

  const changeHome = newHome => {
    setHomeLocation(newHome);
  };

  return (
    <HomeLocationContext.Provider value={{homeLocation, changeHome}}>
      {children}
    </HomeLocationContext.Provider>
  );
};

export const useHomeLocation = () => useContext(HomeLocationContext);

import React, {createContext, useState, useContext, useEffect} from 'react';

const BackgroundContext = createContext();

export const BackgroundProvider = ({children}) => {
  const backgrounds = {
    cloudy: require('../assets/backgrounds/cloudy-background.jpg'),
    night: require('../assets/backgrounds/night-background.jpg'),
    rain: require('../assets/backgrounds/rain-background.jpg'),
    sunset: require('../assets/backgrounds/sunset-background.jpg'),
    snow: require('../assets/backgrounds/snow-background.jpg'),
    sun: require('../assets/backgrounds/light-background.jpg'),
  };

  const getBackground = status => {
    const img = backgrounds[status];
    if (img) {
      return img;
    } else {
      return backgrounds.sun;
    }
  };

  return (
    <BackgroundContext.Provider value={{getBackground}}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);

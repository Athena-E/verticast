import React, {createContext, useState, useContext, useEffect} from 'react';

const SymbolsContext = createContext();

export const BackgroundProvider = ({children}) => {
  const symbols = {
    cloudy: 'cloudy.png',
    halfSun: 'half-sun.png',
    snow: 'snow.png',
    storm: 'storm.png',
    windy: 'windy.png',
    sun: 'sun.png',
    rain: 'rain.png',
  };

  const getBackground = status => {
    const img = symbols[status];
    if (img) {
      return img;
    } else {
      return symbols.sun;
    }
  };

  return (
    <SymbolsContext.Provider value={{getBackground}}>
      {children}
    </SymbolsContext.Provider>
  );
};

export const useBackground = () => useContext(SymbolsContext);

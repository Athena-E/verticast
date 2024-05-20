import React, {createContext, useState, useContext, useEffect} from 'react';
import {useLocations} from './LocationsContext';

const FavouritesContext = createContext();

export const FavouritesProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);
  const {locations} = useLocations();

  const addFavourite = item => {
    //setFavourites([]);
    if (!favourites.some(obj => obj.id === item)) {
      const foundFav = locations.find(obj => obj.id === item);
      setFavourites(prevFavourites => [...prevFavourites, foundFav]);
    }
  };

  const removeFavourite = item => {
    setFavourites(prevFavourites =>
      prevFavourites.filter(favourite => favourite.id !== item),
    );
  };

  return (
    <FavouritesContext.Provider
      value={{favourites, addFavourite, removeFavourite}}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);

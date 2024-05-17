import React, {createContext, useState, useContext} from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = item => {
    setFavourites(prevFavourites => [...prevFavourites, item]);
  };

  const removeFavourite = item => {
    setFavourites(prevFavourites =>
      prevFavourites.filter(favourite => favourite.id !== item.id),
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

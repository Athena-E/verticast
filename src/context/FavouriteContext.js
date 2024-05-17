import React, {createContext, useState, useContext, useEffect} from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesContext = createContext();

export const FavouritesProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    console.log('from context', favourites);
  }, [favourites]);

  // useEffect(() => {
  //   const loadFavourites = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('favourites');
  //       if (jsonValue != null) {
  //         setFavourites(JSON.parse(jsonValue));
  //       }
  //     } catch (e) {
  //       console.error('Failed to load favourites.', e);
  //     }
  //   };
  //
  //   loadFavourites();
  // }, []);
  //
  // useEffect(() => {
  //   const saveFavourites = async () => {
  //     try {
  //       const jsonValue = JSON.stringify(favourites);
  //       await AsyncStorage.setItem('favourites', jsonValue);
  //     } catch (e) {
  //       console.error('Failed to save favourites.', e);
  //     }
  //   };
  //
  //   saveFavourites();
  // }, [favourites]);

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

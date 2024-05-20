import React, {createContext, useContext, useRef, useState} from 'react';
import {Animated} from 'react-native';

// hook to manage notification display

const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  // set initial position of notification label off-screen
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // animation code reused from previous React project - (ae537)
  const showNotification = () => {
    setNotificationVisible(true);
    Animated.timing(slideAnim, {
      // slide down to the top of the screen
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // hide the notification after a delay
    setTimeout(() => {
      Animated.timing(slideAnim, {
        // slide back up
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setNotificationVisible(false));
    }, 2000); // specify notification display duration
  };

  return (
    <NotificationContext.Provider
      value={{notificationVisible, showNotification, slideAnim}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

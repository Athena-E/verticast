import React, {createContext, useState, useContext} from 'react';

// hook to manage current default home location set by user

const DayCountContext = createContext();

export const DayCountProvider = ({children}) => {
  const [dayOffset, setDayOffset] = useState(0);

  const changeOffset = offset => {
    setDayOffset(dayOffset + offset);
  };

  const resetOffset = () => {
    setDayOffset(0);
  };

  return (
    <DayCountContext.Provider value={{dayOffset, changeOffset, resetOffset}}>
      {children}
    </DayCountContext.Provider>
  );
};

export const useDayCount = () => useContext(DayCountContext);

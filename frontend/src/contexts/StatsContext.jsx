import React, { createContext, useState } from 'react';

export const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [runtimes, setRuntimes] = useState([]);

  return (
    <StatsContext.Provider value={{
      genres, setGenres,
      ratings, setRatings,
      runtimes, setRuntimes
    }}>
      {children}
    </StatsContext.Provider>
  );
}

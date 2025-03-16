import React, { createContext, useContext, useState } from "react";

const MusicContext = createContext();

const item = sessionStorage.getItem("list")
  ? JSON.parse(sessionStorage.getItem("list"))
  : {};

export const MusicProvider = ({ children }) => {
  const [collection, setCollection] = useState(item);
  const handleCollection = (val) => {
    sessionStorage.setItem("list", JSON.stringify(val));
    setCollection(val);
  };
  return (
    <MusicContext.Provider value={{ collection, handleCollection }}>
      {children}
    </MusicContext.Provider>
  );
};

// Custom Hook to use the Product Context
export const useMusicList = () => {
  return useContext(MusicContext);
};

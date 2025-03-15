import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [wishList, setWishList] = useState([]);

  return (
    <ProductContext.Provider
      value={{ search, setSearch, wishList, setWishList }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook to use the Product Context
export const useProduct = () => {
  return useContext(ProductContext);
};

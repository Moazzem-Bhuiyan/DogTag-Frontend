"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cardProducts, setCardProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?searchTerm=`
        );
        setProducts(response.data.data.data);
        setLoading(false);
      } catch (err) {
        // toast.error(err.message)
        setError("Server error: " + err);

        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        setProducts,
        cardProducts,
        setCardProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};

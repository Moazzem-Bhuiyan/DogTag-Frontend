"use client";
import { createContext, useContext, useState } from "react";

const DogtagContext = createContext();

export const DogtagProvider = ({ children }) => {
     const [previews, setPreviews] = useState([]);

     return (
          <DogtagContext.Provider value={{ previews, setPreviews }}>
               {children}
          </DogtagContext.Provider>
     );
};

export const useDogtagContext = () => useContext(DogtagContext);

"use client"

import React, { createContext, useState, useContext } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = ({accessToken,refreshToken}) => {
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken );
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout,setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

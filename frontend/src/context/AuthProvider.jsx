import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const intialAuthUser = localStorage.getItem("Users");
  const initialToken = localStorage.getItem("token");

  const [authUser, setAuthUser] = useState(
    intialAuthUser ? JSON.parse(intialAuthUser) : undefined
  );
  const [token, setToken] = useState(initialToken || null);

  const login = (userData, userToken) => {
    setAuthUser(userData);
    setToken(userToken);
    localStorage.setItem("Users", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setAuthUser(undefined);
    setToken(null);
    localStorage.removeItem("Users");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

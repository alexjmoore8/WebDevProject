import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Function to validate and parse localStorage data
  const getInitialState = () => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth);
      } catch (error) {
        console.error('Error parsing auth data from localStorage:', error);
      }
    }
    return { isAuthenticated: false, role: null };
  };

  const [auth, setAuth] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = (userRole) => setAuth({ isAuthenticated: true, role: userRole });
  const logout = () => {
    setAuth({ isAuthenticated: false, role: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

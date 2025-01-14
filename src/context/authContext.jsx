import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuth(loggedInStatus); 
  }, []);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('isLoggedIn');
  };
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/auth/current-user', { withCredentials: true });
      setIsLoggedIn(true);
      setCurrentUser(res.data.data);
    } catch {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const login = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

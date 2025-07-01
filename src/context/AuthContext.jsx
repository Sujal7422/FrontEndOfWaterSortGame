import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/baseURL";

// ✅ Create the Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Fetch current user from backend
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/current-user`, {
        withCredentials: true,
      });
      setUser(res.data.data);
      setIsLoggedIn(true);
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    await axios.get(`${BASE_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export useAuth hook
export const useAuth = () => useContext(AuthContext);

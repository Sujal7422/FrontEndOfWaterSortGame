import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ On page load, try fetching current user or refresh token
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/user/current-user");
      setUser(res.data.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("No active session or token. Trying refresh...");
      await tryRefreshToken();
    } finally {
      setLoading(false);
    }
  };

  const tryRefreshToken = async () => {
    try {
      const res = await axios.post("/user/refresh-token");
      const token = res.data.data.userAccessToken;

      // ✅ Set Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // ✅ Now fetch user
      const userRes = await axios.get("/user/current-user");
      setUser(userRes.data.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("Token refresh failed:", err.message);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const login = async ({ Email, Password }) => {
    const res = await axios.post("/user/login", { Email, Password });

    const token = res.data.data.userAccessToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(res.data.data.user);
    setIsLoggedIn(true);

    return { success: true };
  };

  const register = async (Username, Email, Password) => {
    const res = await axios.post("/user/register", { Username, Email, Password });

    const token = res.data.data.userAccessToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(res.data.data.user);
    setIsLoggedIn(true);

    return { success: true };
  };

  const logout = async () => {
    await axios.post("/user/logout");

    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    return storedToken && storedUser ? { token: storedToken, user: JSON.parse(storedUser) } : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        setAuthUser({ token: storedToken, user: JSON.parse(storedUser) });
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setAuthUser(null);
      }
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      console.warn("WARNING: Login implementation is pending. Using dummy login.");

      if (username && password) {
        const dummyToken = 'dummy-token-abc-123';
        const dummyUser = {
          _id: 'dummyUserId123',
          firstname: 'Dummy',
          lastname: 'User',
          email: username,
          role: 'user'
        };

        if (username === 'admin' && password === 'admin') {
           dummyUser.role = 'admin';
           dummyUser.firstname = 'Admin';
           dummyUser.lastname = 'User';
        }

        localStorage.setItem('authToken', dummyToken);
        localStorage.setItem('user', JSON.stringify(dummyUser));

        setAuthUser({ token: dummyToken, user: dummyUser });
        console.log("Dummy Login Successful for:", username);
        return dummyUser;
      } else {
        throw new Error('Please enter a username and password.');
      }
    } catch (error) {
      console.error('Dummy Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // REMOVED: The register function and its logic here

  const logout = async () => {
    setLoading(true);
    try {
      console.warn("WARNING: Logout implementation (backend call) is pending. Performing client-side logout.");
    } catch (error) {
      console.warn('Backend logout failed or not implemented:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setAuthUser(null);
      setLoading(false);
      console.log("Logged out (dummy).");
    }
  };

  const value = {
    isAuthenticated: !!authUser,
    user: authUser?.user || null,
    userId: authUser?.user?._id || null,
    userName: authUser?.user ? `${authUser.user.firstname} ${authUser.user.lastname}` : null,
    isAdmin: authUser?.user?.role === 'admin',
    loading,
    login,
    // REMOVED: register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
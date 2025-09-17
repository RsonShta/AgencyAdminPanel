// src/context/auth-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/storage";
import { logout as logoutApi } from "../api/apiData"; // Assuming this is the correct logout API call

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string | null;
  username: string | null;
  isLoading: boolean;
  login: (token: string, role: string, username: string) => void;
  logout: (callback?: () => void, showMessage?: (msg: string, type: 'success' | 'error' | 'warning') => void) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = storage.get("accessToken");
    const storedRole = storage.get("role");
    const storedUsername = storage.get("username");

    if (storedToken && storedRole && storedUsername) {
      setAccessToken(storedToken);
      setRole(storedRole);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userRole: string, userName: string) => {
    storage.set("accessToken", token);
    storage.set("role", userRole);
    storage.set("username", userName);
    setAccessToken(token);
    setRole(userRole);
    setUsername(userName);
    setIsAuthenticated(true);
  };

  const logout = async (callback?: () => void, showMessage?: (msg: string, type: 'success' | 'error' | 'warning') => void) => {
    let shouldLogoutLocally = true;
    let message = 'Successfully logged out';
    let messageType: 'success' | 'error' | 'warning' = 'success';

    try {
      // Call backend logout API to revoke token
      if (accessToken) {
        await logoutApi(accessToken);
      }
    } catch (error: any) {
      console.error("Logout API call failed:", error);

      // Check if it's a network error (backend unreachable)
      if (!error.response) {
        message = 'Server unreachable, but you have been logged out locally.';
        messageType = 'warning';
      } else if (error.response?.status === 401) {
        // Token expired - this is normal, just logout locally
        message = 'Successfully logged out (token was already expired)';
        messageType = 'success';
      } else {
        // Other API errors
        message = 'Backend logout failed, but you have been logged out locally.';
        messageType = 'warning';
      }
    }

    if (shouldLogoutLocally) {
      // Clear local storage regardless of API call result
      storage.remove("accessToken");
      storage.remove("role");
      storage.remove("username");
      setAccessToken(null);
      setRole(null);
      setUsername(null);
      setIsAuthenticated(false);
    }

    if (callback) callback();

    // Show message if callback provided
    if (showMessage) {
      showMessage(message, messageType);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        role,
        username,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

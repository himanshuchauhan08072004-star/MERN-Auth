import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken } from "../services/api.js";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
} from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until first refresh check completes
  const [sessionStartedAt, setSessionStartedAt] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Persistent login: on app load, try to silently exchange the
  // HttpOnly refresh cookie (if any) for a fresh access token.
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await refreshRequest();
        setAccessToken(data.accessToken);
        const meRes = await meRequest();
        setUser(meRes.data.user);
        setSessionStartedAt(new Date());
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginRequest(credentials);
    setAccessToken(data.accessToken);
    setUser(data.user);
    setSessionStartedAt(new Date());
    return data;
  };

  const register = async (payload) => {
    const { data } = await registerRequest(payload);
    return data;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
      setSessionStartedAt(null);
    }
  };

  // Manual refresh trigger — used by the "Refresh Session" quick action
  // on the dashboard. Returns true/false so the UI can toast accordingly.
  const refreshSession = async () => {
    try {
      const { data } = await refreshRequest();
      setAccessToken(data.accessToken);
      setRefreshCount((c) => c + 1);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, sessionStartedAt, refreshCount, login, register, logout, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

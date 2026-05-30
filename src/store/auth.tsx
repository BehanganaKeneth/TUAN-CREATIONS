/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { clearSession, getCurrentUser, getStoredSession, loginUser, logoutUser, storeSession } from "../services/api";

export type { AuthUser, UserRole } from "../services/api";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: { name: string; email: string; role: UserRole; password?: string }) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedSession = getStoredSession();
  const [user, setUser] = useState<AuthUser | null>(storedSession?.user ?? null);

  useEffect(() => {
    const token = storedSession?.token;
    if (!token) return;

    let isMounted = true;
    getCurrentUser()
      .then((currentUser) => {
        if (!isMounted) return;
        const nextSession = { user: currentUser, token };
        setUser(currentUser);
        storeSession(nextSession);
      })
      .catch(() => {
        if (!isMounted) return;
        clearSession();
        setUser(null);
      });

    return () => {
      isMounted = false;
    };
  }, [storedSession?.token]);

  const login = useCallback(async ({ name, email, role, password }: { name: string; email: string; role: UserRole; password?: string }) => {
    const nextUser = await loginUser({ name, email, role, password });
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const value = { user, isAuthenticated: Boolean(user), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

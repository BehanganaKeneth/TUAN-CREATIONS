import React, { createContext, useContext, useMemo, useState } from "react";

export type UserRole = "student" | "partner" | "client" | "investor";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: { name: string; email: string; role: UserRole }) => void;
  logout: () => void;
};

const AUTH_KEY = "tuan_os_auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const login = ({ name, email, role }: { name: string; email: string; role: UserRole }) => {
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
    };

    setUser(nextUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import authService, { User } from "@/src/services/auth.service";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const refreshProfile = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      return;
    }

    const response = await authService.getProfile();

    if (response.success) {
      setUser(response.data.user);
    }
  } catch (error) {
    console.error("Failed to load authenticated user:", error);
    localStorage.removeItem("accessToken");
    setUser(null);
  }
};

useEffect(() => {
  const initializeAuth = async () => {
    try {
      await refreshProfile();
    } finally {
      setIsLoading(false);
    }
  };

  initializeAuth();
}, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("accessToken", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

 const value = useMemo(
  () => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshProfile,
  }),
  [user, isLoading]
);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
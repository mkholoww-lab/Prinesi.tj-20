import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "operator" | "manager";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  hasAccess: (requiredRole: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, role: UserRole) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      role,
      name:
        role === "admin"
          ? "Admin User"
          : role === "operator"
            ? "Operator User"
            : "Manager User",
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const hasAccess = (requiredRoles: UserRole[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout, hasAccess }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

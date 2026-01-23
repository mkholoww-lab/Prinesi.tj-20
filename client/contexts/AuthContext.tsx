import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "operator" | "manager";

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  allUsers: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasAccess: (requiredRole: UserRole[]) => boolean;
  changePassword: (newPassword: string) => void;
  updateAvatar: (avatarUrl: string) => void;
  createUser: (username: string, password: string, role: UserRole, name: string) => boolean;
  deleteUser: (userId: string) => boolean;
  updateUserProfile: (userId: string, updates: Partial<User>) => void;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default users
const DEFAULT_USERS: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    username: "operator",
    password: "operator123",
    role: "operator",
    name: "Operator User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    username: "manager",
    password: "manager123",
    role: "manager",
    name: "Manager User",
    createdAt: new Date().toISOString(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(DEFAULT_USERS);

  const login = (username: string, password: string) => {
    const foundUser = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
      };
      setUser(updatedUser);
      setAllUsers(
        allUsers.map((u) => (u.id === foundUser.id ? updatedUser : u))
      );
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasAccess = (requiredRoles: UserRole[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const changePassword = (newPassword: string) => {
    if (!user) return;

    const updatedUser = { ...user, password: newPassword };
    setUser(updatedUser);
    setAllUsers(
      allUsers.map((u) => (u.id === user.id ? updatedUser : u))
    );
  };

  const updateAvatar = (avatarUrl: string) => {
    if (!user) return;

    const updatedUser = { ...user, avatar: avatarUrl };
    setUser(updatedUser);
    setAllUsers(
      allUsers.map((u) => (u.id === user.id ? updatedUser : u))
    );
  };

  const createUser = (
    username: string,
    password: string,
    role: UserRole,
    name: string
  ) => {
    // Check if user already exists
    if (allUsers.some((u) => u.username === username)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      role,
      name,
      createdAt: new Date().toISOString(),
    };

    setAllUsers([...allUsers, newUser]);
    return true;
  };

  const deleteUser = (userId: string) => {
    if (!user || user.role !== "admin") {
      return false;
    }

    if (user.id === userId) {
      return false; // Can't delete yourself
    }

    setAllUsers(allUsers.filter((u) => u.id !== userId));
    return true;
  };

  const updateUserProfile = (userId: string, updates: Partial<User>) => {
    setAllUsers(
      allUsers.map((u) =>
        u.id === userId ? { ...u, ...updates } : u
      )
    );

    if (user?.id === userId) {
      setUser({ ...user, ...updates });
    }
  };

  const getAllUsers = () => allUsers;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        allUsers,
        login,
        logout,
        hasAccess,
        changePassword,
        updateAvatar,
        createUser,
        deleteUser,
        updateUserProfile,
        getAllUsers,
      }}
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

import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { User } from "@/lib/User";
import { AuthContext } from "./context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("melodyverse_user") || "null")
  );

  const login = async (userData: Pick<User, "email" | "password">) => {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", {
      userData,
    });
    setCurrentUser(data);
    localStorage.setItem("melodyverse_user", JSON.stringify(data));
  };

  const register = async (userData: User) => {
    const { data } = await axios.post("http://localhost:5000/api/auth/signup", {
      userData,
    });
    setCurrentUser(data);
    localStorage.setItem("melodyverse_user", JSON.stringify(data));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("melodyverse_user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("melodyverse_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

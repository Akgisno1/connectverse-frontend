import { createContext } from "react";
import { User } from "@/lib/User"; // Adjust the import path if necessary

export interface AuthContextType {
  currentUser: User | null;
  login: (userData: Pick<User, "email" | "password">) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

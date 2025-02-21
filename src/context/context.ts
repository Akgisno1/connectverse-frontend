import { User } from "@/lib/User";
import { createContext } from "react";

interface AuthContextType {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

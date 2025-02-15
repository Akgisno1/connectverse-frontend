import { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

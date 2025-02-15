import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl mb-4">
        Welcome, {currentUser && currentUser.username}!
      </h1>
      <p className="text-gray-700 mb-4">
        Email: {currentUser && currentUser.email}
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">
        MelodyVerse
      </Link>
      <div>
        {currentUser ? (
          <>
            <span className="mr-4">Hi, {currentUser.username}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-500 px-4 py-2 rounded">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";
import { useContext } from "react";
import axios from "axios";
import { Button } from "./ui/button";

export default function Loginout() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { updateUser, currentUser } = authContext;

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      updateUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Hide the component on login and signup pages

  return (
    <div className="flex flex-row items-center ">
      {currentUser ? (
        <>
          <span className="mr-4">Hi, {currentUser.username}</span>
          <Button
            onClick={logout}
            className="text-[1.2vw] font-sans font-bold py-[0.5vw] border-[0.2vw] border-red-500 text-red-500 items-center px-[2vw] rounded-full hover:text-[1.25vw] bg-white hover:bg-red-500 hover:border-white hover:text-white hover"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link
            to="/signup"
            className="text-[1.2vw] font-sans font-bold p-[0.5vw]  border-white items-center px-[2vw] rounded-full hover:text-[1.25vw]  hover:text-violet-700"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="text-[1.2vw] font-sans font-bold py-[0.5vw] border-[0.2vw] border-white items-center px-[2vw] rounded-full hover:text-[1.25vw] bg-violet-700 hover:bg-white hover:border-violet-700 hover:text-violet-700"
          >
            Log in
          </Link>
        </>
      )}
    </div>
  );
}

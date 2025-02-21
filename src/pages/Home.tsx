import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl mb-6">Welcome to MelodyVerse</h1>
      <p className="text-lg mb-6 text-gray-700">
        Your favorite music platform!
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

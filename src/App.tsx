import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import Dashboard from "./pages/DashBoard";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

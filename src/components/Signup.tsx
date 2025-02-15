import { ChangeEvent, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4">Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

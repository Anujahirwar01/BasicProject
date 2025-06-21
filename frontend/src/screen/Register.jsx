import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext"; // ✅ Import useAuth

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Use context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // 1. Register
      await axios.post(
        "http://localhost:5000/users/register",
        { email, password },
        { withCredentials: true }
      );

      // 2. Login
      const res = await axios.post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      );

      // 3. Set user context
      setUser(res.data.user);

      // 4. Redirect
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration or login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Register</h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block text-black mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 mb-4 border border-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block text-black mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 mb-6 border border-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-black">Already registered? </span>
          <Link to="/login" className="text-black underline hover:text-gray-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

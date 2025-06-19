import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email already exists
        const userExists = users.some((user) => user.email === email);
        if (userExists) {
            setError("Email is already registered.");
            return;
        }

        // Save new user
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        // Redirect to login
        navigate("/home");
    };

    return (
        <div className="min-h-screen  flex items-center justify-center bg-black">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">Register</h1>
                {error && (
                    <div className="mb-4 text-red-600 text-center">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block text-black mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 mb-4 border border-black rounded focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="block text-black mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 mb-6 border border-black rounded focus:outline-none"
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
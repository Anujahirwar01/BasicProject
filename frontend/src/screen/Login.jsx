import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if user exists
        const user = users.find((user) => user.email === email);

        if (!user) {
            setError("User not registered. Redirecting to register...");
            setTimeout(() => {
                navigate("/register");
            }, 1500);
            return;
        }

        // Check password
        if (user.password !== password) {
            setError("Incorrect password.");
            return;
        }

        // Successful login
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">Login</h1>
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
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span className="text-black">Not registered? </span>
                    <Link to="/register" className="text-black underline hover:text-gray-700">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
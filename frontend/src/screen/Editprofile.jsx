import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.put(
        `http://localhost:5000/users/${user._id}`,
        { name, email },
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate(`/users/${user._id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

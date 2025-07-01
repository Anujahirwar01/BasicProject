import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import Header from "../layouts/header";
import Sidebar from "../layouts/navbar";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [description, setDescription] = useState(user?.description || "");
  const [tags, setTags] = useState(user?.tags?.join(", ") || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.put(
        `http://backend-service-6o5m.onrender.com/users/${user._id}`,
        {
          name,
          description,
          tags: tags.split(",").map(tag => tag.trim()),
        },
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate(`/users/${user._id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  const parsedTags = tags.split(",").map(tag => tag.trim()).filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <div className="min-h-screen flex items-center px-6 sm:px-10 justify-center w-full">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-8 sm:p-10 rounded-2xl shadow-md w-full max-w-xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Edit Profile
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Display Name */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Display Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Email (not editable)</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                value={email}
                readOnly
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Tags */}
            <div className="mb-2">
              <label className="block font-medium mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="e.g. fullstack, react, dev"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Tag preview */}
            {parsedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-6">
                {parsedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

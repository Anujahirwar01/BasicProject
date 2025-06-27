import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../layouts/header";
import Sidebar from "../layouts/navbar";
import axios from "axios";
import { useAuth } from "../context/authContext";

const UserProfile = () => {
  const { id } = useParams(); // URL param
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { user: loggedInUser } = useAuth(); // Current logged-in user

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="px-70 py-6 mt-[64px] flex space-x-4">
  {/* Profile avatar */}
  <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
    {user.name?.charAt(0).toUpperCase()}
  </div>

  {/* User details */}
  <div>
    <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
    <p className="text-gray-600 mb-1">Email: {user.email}</p>
    <p className="text-gray-600">
      Joined: {new Date(user.createdAt).toLocaleString()}
    </p>

    {/* ✅ Add this */}
    {user.description && (
      <p className="text-gray-800 mt-3">
        <span className="font-semibold">Description:</span> {user.description}
      </p>
    )}

    {user.tags && user.tags.length > 0 && (
      <div className="mt-2">
        <span className="font-semibold text-gray-700">Tags:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {user.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Edit button */}
    {loggedInUser && loggedInUser._id === user._id && (
      <Link
        to={`/users/${user._id}/edit`}
        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Edit Profile
      </Link>
    )}
  </div>
</main>

      </div>
    </div>
  );
};

export default UserProfile;

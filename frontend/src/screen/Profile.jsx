import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../layouts/header";
import Sidebar from "../layouts/navbar";
import axios from "axios";
import { useAuth } from "../context/authContext";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      });
  }, [id]);

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex flex-col md:flex-row items-start ml-40 mt-[64px] px-6 py-8 w-full space-x-0 md:space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <div className="bg-blue-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-semibold shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {user.name}
            </h1>

            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Email:</span> {user.email}
            </p>

            <p className="text-gray-600 mb-3">
              <span className="font-semibold">Joined:</span>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>

            {/* Description */}
            {user.description && (
              <p className="text-gray-800 mb-3">
                <span className="font-semibold">About:</span> {user.description}
              </p>
            )}

            {/* Tags */}
            {user.tags && user.tags.length > 0 && (
              <div className="mb-4">
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

            {/* Edit Button */}
            {loggedInUser && loggedInUser._id === user._id && (
              <Link
                to={`/users/${user._id}/edit`}
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
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

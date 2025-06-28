import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="w-full h-[3px]" style={{ backgroundColor: "#EC8035" }} />

      <div className="px-50 py-3 flex items-center justify-between">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/">
  <img
    src="/logo.svg" // ← your local logo file from /public folder
    alt="Logo"
    className="h-10 w-10  object-contain"
  />
</Link>


          <Link to="/" className="text-black font-medium hover:bg-gray-100 rounded">About</Link>
          <Link to="/" className="text-black font-medium hover:bg-gray-100 rounded">Products</Link>
          <Link to="/" className="text-black font-medium hover:bg-gray-100 rounded">For Teams</Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 px-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to={`/users/${user._id}`}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      {/* Accent Line */}
      <div className="w-full h-[3px]" style={{ backgroundColor: "#EC8035" }} />

      {/* Header Content */}
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </Link>

        {/* Navigation or Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Logged-in user details */}
              <span className="text-black font-medium">{user.email}</span>

              <Link
                to="/profile"
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm" onMouseLeave={handleMouseLeave}>
      <div className="w-full h-[3px]" style={{ backgroundColor: "#EC8035" }} />

      <div className="px-10 py-3 flex items-center justify-between">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <img
    src="data:image/png;base64,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"
              alt="StackZone Logo"
              className="h-6 w-auto object-contain"
            />
            <span className="text-xl font-semibold text-orange-500">
              StackZone
            </span>
          </Link>

          {/* Dropdown-enabled buttons */}
          <div className="relative flex items-center space-x-4">
            {["About", "Products", "For Teams"].map((label) => (
              <div key={label} className="relative group">
                <button
                  onClick={() => toggleDropdown(label)}
                  className="text-black font-medium hover:bg-gray-200 rounded px-2 py-1"
                >
                  {label}
                </button>

                {openDropdown === label && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border rounded shadow-lg z-50 p-4 space-y-2 text-sm text-gray-700">
                    {label === "About" && (
                      <>
                        <p className="font-semibold">Empowering developers worldwide</p>
                        <p>Learn more about StackZone's mission, vision, and the team behind the platform.</p>
                        <p>We support the global community of coders through collaboration and shared knowledge.</p>
                      </>
                    )}

                    {label === "Products" && (
                      <>
                        <p className="font-semibold">Explore our tools</p>
                        <p>• Q&A for developers — ask and answer programming questions.</p>
                        <p>• StackZone Teams — a private space for your company to share knowledge.</p>
                        <p>• Collectives — find trusted communities for specific technologies.</p>
                      </>
                    )}

                    {label === "For Teams" && (
                      <>
                        <p className="font-semibold">Collaborate better with Teams</p>
                        <p>Create a secure, private knowledge base with your team.</p>
                        <p>Save time, reduce duplication, and build a stronger internal knowledge culture.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
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

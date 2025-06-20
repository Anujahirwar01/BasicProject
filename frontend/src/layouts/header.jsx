import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      {/* 🔴 Top Accent Line */}
      <div className="w-full h-[3px] "style={{ backgroundColor: "#EC8035" }}  />

      {/* Main Header Content */}
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Tabs */}
        <div className="flex items-center space-x-6">
          <Link to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
          </Link>

          <nav className="flex items-center space-x-4">
            <NavLink
              to="/"
              className="text-black hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              About
            </NavLink>
            <NavLink
              to="/"
              className="text-black hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              Products
            </NavLink>
            <NavLink
              to="/"
              className="text-black hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              For Teams
            </NavLink>
          </nav>
        </div>

        {/* Right: Search + Login */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div className="flex-1 max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Link
  to="/login"
  className="text-white px-4 py-2 rounded-full transition hover:opacity-90"
  style={{ backgroundColor: "#EC8035" }}
>
  Log In
</Link>

        </div>
      </div>
    </header>
  );
};

export default Header;

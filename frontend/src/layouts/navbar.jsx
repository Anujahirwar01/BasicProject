import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-6 fixed top-0 left-0 mt-[64px] shadow-md">
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className="px-4 py-2 rounded-md hover:bg-white transition"
        >
            <i className="ri-home-2-line"></i>
          Home
        </NavLink>
        <NavLink
          to="/questions"
          className="px-4 py-2 rounded-md hover:bg-white transition"
        >
            <i className="ri-questionnaire-line"></i>
          Questions
        </NavLink>
        <NavLink
          to="/tag"
          className="px-4 py-2 rounded-md hover:bg-white transition"
        >
            <i className="ri-bookmark-line"></i>
          Tag
        </NavLink>
                <NavLink
          to="/users"
          className="px-4 py-2 rounded-md hover:bg-white transition"
        >
            <i className="ri-user-line"></i>
          User
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

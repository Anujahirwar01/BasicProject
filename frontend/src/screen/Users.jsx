import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../layouts/header";
import Sidebar from "../layouts/navbar";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://backend-service-6o5m.onrender.com/users", { withCredentials: true })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="px-70 mt-[64px] w-full">
          <h1 className="text-3xl font-bold mb-4">All Users</h1>
          <ul className="space-y-3">
            {users.map(user => (
              <li key={user._id} className="p-4 bg-white rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to={`/users/${user._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Profile
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Users;

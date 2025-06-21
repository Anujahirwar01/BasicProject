import React from "react";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/rightnavbar";
import { Link } from "react-router-dom";

const Questions = () => {
  console.log("Questions component mounted");

  return (
    <div>
      <Header />
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "60px 50px",
        }}
      >
        <div style={{ width: "75%", marginTop: "0px" }}>
          <div className="flex items-center ml-30 gap-88 mb-4">
            <h1 className="text-3xl left-20 font-semibold">Top Questions</h1>
            <Link
              to="/AskQuestion"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ask a Question
            </Link>
          </div>
        </div>

        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Questions;

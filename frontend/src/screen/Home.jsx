import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/rightnavbar";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  return (
    <div>
      <Header />
      <Navbar />

      <div className="flex justify-between p-10">
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Top Questions</h1>
            <Link
              to="/AskQuestion"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ask Question
            </Link>
          </div>

          <p className="mb-4">{questions.length} questions</p>

          <div>
            {questions.map((q) => (
              <div
                key={q._id}
                className="flex bg-yellow-50 border-b py-4 px-4 hover:bg-yellow-100 transition"
              >
                {/* Stats */}
                <div className="w-1/6 text-sm text-gray-700 text-center">
                  <p>{q.upVotes?.length || 0} votes</p>
                  <p>{q.answers?.length || 0} answers</p>
                </div>

                {/* Question Content */}
                <div className="w-5/6">
                  <Link
                    to={`/question/${q._id}`}
                    className="text-blue-700 text-lg font-semibold hover:underline"
                  >
                    {q.question}
                  </Link>

                  {/* Tags */}
                  <div className="mt-1 flex flex-wrap gap-2">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-sm px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta info */}
                  <p className="text-xs text-gray-600 mt-1">
                    asked {formatTimeAgo(q.askedOn)} by{" "}
                    {q.userPosted?.name || q.userPosted || "anonymous"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/4 pl-6">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;

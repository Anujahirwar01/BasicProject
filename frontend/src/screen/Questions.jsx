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
        const res = await axios.get("https://backend-service-6o5m.onrender.com/questions",{ withCredentials: true });
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Sort: highest votes → most words
  const sortedQuestions = [...questions].sort((a, b) => {
    const votesA = a.upvotes?.length || 0;
    const votesB = b.upvotes?.length || 0;

    if (votesB !== votesA) return votesB - votesA;

    const wordCountA =
      (a.title?.split(" ").length || 0) +
      (a.description?.split(" ").length || 0);
    const wordCountB =
      (b.title?.split(" ").length || 0) +
      (b.description?.split(" ").length || 0);

    return wordCountB - wordCountA;
  });

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
        {/* Left Section */}
        <div className="w-3/4">
          <div className="flex justify-between items-center ml-30 mb-6">
            <h1 className="text-3xl font-semibold mt-4">Top Questions</h1>
            <Link
              to="/AskQuestion"
              className="bg-blue-500 hover:bg-blue-600 mt-5 text-white px-7 py-2 rounded"
            >
              Ask a Question
            </Link>
          </div>

          <p className="mb-1">{questions.length} questions</p>

          <div className="space-y-4">
            {sortedQuestions.map((q) => (
              <div
                key={q._id}
                className="flex flex-col bg-yellow-50 border-b py-4 px-6 ml-20 w-full hover:bg-yellow-100 transition"
              >
                <div className="flex items-start space-x-6">
                  {/* Votes & Answers */}
                  <div className="w-1/6 text-sm ml-40 text-gray-700 text-center">
                    <p>{q.upvotes?.length || 0} votes</p>
                    <p>{q.answer?.length || 0} answers</p>
                  </div>

                  {/* Content */}
                  <div className="w-5/6">
                    <Link
                      to={`/question/${q._id}`}
                      className="text-blue-700 text-lg font-semibold hover:underline"
                    >
                      {q.title}
                    </Link>

                    {/* Tags */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {q.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 text-sm px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <p className="text-xs text-gray-600 mt-2">
                      asked {formatTimeAgo(q.askedOn)} by{" "}
                      {q.userPosted?.name || q.userPosted || "anonymous"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/4 mr-12.5 mt-5 pl-6">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;

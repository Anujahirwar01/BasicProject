import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/rightnavbar";

const QuestionInterface = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [answerBody, setAnswerBody] = useState("");
  const [userId, setUserId] = useState("");

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`https://backend-service-6o5m.onrender.com/questions/${id}`,{ withCredentials: true });
      setQuestion(res.data.question);
    } catch (err) {
      console.error(err);
      setError("Failed to load question");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://backend-service-6o5m.onrender.com/users/profile", {
        withCredentials: true,
      });
      setUserId(res.data.user._id);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchQuestion();
  }, [id]);

  const handleUpvote = async () => {
    try {
      await axios.post(
        `https://backend-service-6o5m.onrender.com/questions/${id}/upvote`,
        {},
        { withCredentials: true }
      );
      fetchQuestion();
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  const handleSubmitAnswer = async () => {
    try {
      await axios.post(
        `https://backend-service-6o5m.onrender.com/questions/${id}/answer`,
        { answerText: answerBody },
        { withCredentials: true }
      );
      setAnswerBody("");
      fetchQuestion();
    } catch (err) {
      console.error("Failed to submit answer", err);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await axios.delete(
        `https://backend-service-6o5m.onrender.com/questions/${id}/answer/${answerId}`,
        { withCredentials: true }
      );
      fetchQuestion();
    } catch (err) {
      console.error("Failed to delete answer", err);
    }
  };

  if (error) return <p className="text-red-600 text-center mt-8">{error}</p>;
  if (!question) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="min-h-screen mt-8 ml-38 bg-gray-50">
      <Header />
      <Navbar />
      <div className="flex mt-6 px-10 space-x-6">
        {/* Left - Main Content */}
        <div className="w-3/4">
          <div className="flex items-start mt-20 space-x-6 bg-white rounded-lg p-6 shadow-md">
            {/* Votes */}
            <div className="flex flex-col items-center text-gray-600 space-y-2">
              <button
                onClick={handleUpvote}
                className="text-2xl font-bold hover:text-green-600 transition"
                title="Upvote"
              >
                ▲
              </button>
              <p className="text-lg font-semibold">
                {question.upvotes?.length || 0}
              </p>
              <button
                className="text-2xl font-bold hover:text-red-600 transition"
                title="Downvote"
              >
                ▼
              </button>
            </div>

            {/* Question */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {question.title}
              </h1>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {question.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {question.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                asked {new Date(question.askedOn).toLocaleDateString()} by{" "}
                <span className="text-blue-600 font-medium">
                  {question.userPosted?.name || "Anonymous"}
                </span>
              </p>
            </div>
          </div>

          <hr className="my-8 border-gray-300" />

          {/* Answers */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Answers</h2>
            {question.answer.length > 0 ? (
              question.answer.map((ans, i) => (
                <div
                  key={i}
                  className="bg-white shadow border p-4 rounded-lg mb-4"
                >
                  <p className="text-gray-800 leading-relaxed">
                    {ans.answerBody}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Answered by {ans.userAnswered || "Anonymous"} on{" "}
                    {new Date(ans.answeredOn).toLocaleString()}
                  </p>
                  {String(ans.userId) === String(userId) && (
                    <button
                      onClick={() => handleDeleteAnswer(ans._id)}
                      className="mt-2 text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No answers yet.</p>
            )}
          </div>

          <hr className="my-8 border-gray-300" />

          {/* Answer Form */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
            <textarea
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
              rows="5"
              className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
              placeholder="Write your answer here..."
            />
            <div className="mt-3">
              <button
                onClick={handleSubmitAnswer}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Post Your Answer
              </button>
             
            </div>
<p>
  Browse another tagged question of{" "}
  <span className="font-semibold">
    {question.tags?.[0] || "this topic"}
  </span>{" "}
  or{" "}
  <Link to='/AskQuestion' className="text-blue-500">ask another question?</Link>
</p>
          </div>
        </div>

        {/* Right - Sidebar */}
        <div className="w-1/4 mr-12.5 mt-5 pl-6">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default QuestionInterface;

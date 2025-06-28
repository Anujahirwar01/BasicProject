import React, { useEffect, useState } from "react";
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
      const res = await axios.get(`http://localhost:5000/questions/${id}`);
      setQuestion(res.data.question);
    } catch (err) {
      console.error(err);
      setError("Failed to load question");
    }
  };

  const fetchUser = async () => {
  try {
    const res = await axios.get("http://localhost:5000/users/profile", { withCredentials: true });


    // ✅ Fix: Extract _id from res.data.user, not res.data
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
        `http://localhost:5000/questions/${id}/upvote`,
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
        `http://localhost:5000/questions/${id}/answer`,
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
        `http://localhost:5000/questions/${id}/answer/${answerId}`,
        {
          withCredentials: true,
        }
      );
      fetchQuestion();
    } catch (err) {
      console.error("Failed to delete answer", err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!question) return <p>Loading...</p>;

  return (
    <div className="min-h-screen ml-30">
      <Header />
      <Navbar />
      <div className="flex mt-6 px-10 space-x-6">
        {/* Main Content */}
        <div className="w-3/4">
          <div className="flex items-start space-x-6">
            {/* Voting Section */}
            <div className="flex flex-col items-center text-gray-600 px-30 ml-5 mt-10 space-y-2">
              <button
                onClick={handleUpvote}
                className="text-2xl font-bold hover:text-green-600"
              >
                ▲
              </button>
              <p className="text-lg">{question.upvotes?.length || 0}</p>
              <button className="text-2xl font-bold hover:text-red-600">▼</button>
            </div>

            {/* Question Content */}
            <div className="flex-1 mr-72 mt-10">
              <h1 className="text-2xl font-semibold">{question.title}</h1>
              <p className="mt-2 text-gray-800">{question.description}</p>

              {/* Tags */}
              <div className="mt-3 flex gap-2 flex-wrap">
                {question.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-200 text-sm py-1 px-2 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <p className="text-xs text-gray-500 mt-2">
                asked {new Date(question.askedOn).toLocaleDateString()} by{" "}
                <span className="text-blue-600 font-medium">
                  {question.userPosted?.name || "Anonymous"}
                </span>
              </p>
            </div>
          </div>

          {/* Answer Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Answers</h2>
            {question.answer.length > 0 ? (
              question.answer.map((ans, i) => (
                <div key={i} className="bg-gray-100 border p-4 rounded mb-4">
                  <p>{ans.answerBody}</p>
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

          {/* Answer Form */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
            <textarea
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
              rows="5"
              className="w-110 border border-gray-300 ml-18 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your answer..."
            />
            <div className="mt-3 ml-18">
              <button
                onClick={handleSubmitAnswer}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Post Your Answer
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/4 mr-10 mt-10 pl-6">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default QuestionInterface;

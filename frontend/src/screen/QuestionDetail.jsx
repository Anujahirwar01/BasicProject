import { useState } from "react";
import axios from "axios";

const QuestionDetail = ({ question }) => {
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://backend-service-6o5m.onrender.com/ai/generate",
        { question: question.title },
        { withCredentials: true }
      );
      setAiAnswer(res.data.answer);
    } catch (err) {
      setAiAnswer("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="p-4">
    {/* Displayed Question */}
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <p className="text-gray-700">{question.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>

    {/* Ask AI button */}
    {question.answer?.length === 0 && (
      <button
        onClick={handleAskAI}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        🤖 Ask AI
      </button>
    )}

    {loading && <p>Loading AI answer...</p>}

    {aiAnswer && (
      <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded">
        <h4 className="font-semibold mb-2">AI-generated answer:</h4>
        <p>{aiAnswer}</p>
      </div>
    )}
  </div>
);

};

export default QuestionDetail;
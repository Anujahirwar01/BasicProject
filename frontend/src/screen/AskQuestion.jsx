import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";

const AskQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " " || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 5 && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/questions/AskQuestion",
        { title, description, tags },
        { withCredentials: true }
      );
      console.log("Success:", res.data);
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
      setError("Login to ask a question");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex items-start justify-center py-10">
        <div className="w-full max-w-3xl bg-gray-50 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Ask a Public Question</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6 ">
              <label className="font-semibold block mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to center a div in CSS?"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="font-semibold block mb-1 text-gray-700">Body</label>
              <textarea
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain your problem clearly..."
                className="w-full p-2 border border-gray-300 rounded resize-y focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="font-semibold block mb-1 text-gray-700">Tags (up to 5)</label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 px-2 py-1 rounded text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type and press Enter"
                  className="flex-1 min-w-[120px] p-1 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition duration-200"
              >
                Post Your Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;

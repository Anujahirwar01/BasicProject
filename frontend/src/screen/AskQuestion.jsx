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
      const res = await axios.post("http://localhost:5000/questions/AskQuestion", {
  title,
  description,
  tags,
}, { withCredentials: true });

      console.log("Success:", res.data);
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
      setError("Failed to post question");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-md bg-white shadow">
        <h1 className="text-3xl font-bold mb-6">Ask a public question</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-6">
            <label className="font-bold block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to center a div in CSS?"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="font-bold block mb-1">Body</label>
            <textarea
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded resize-y"
              required
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="font-bold block mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 p-2 border rounded">
              {tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 px-2 py-1 rounded text-sm">
                  {tag}
                  <button
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
                placeholder="Press Enter to add tag"
                className="flex-1 p-1 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post Your Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionForm;

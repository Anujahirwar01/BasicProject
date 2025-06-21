import React, { useState } from "react";
import Header from "../layouts/header";
import { Link } from "react-router-dom";

const AskQuestionForm = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

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

  return (
    <div className="">
      <Header className="sticky " />
      <div className="max-w-3xl mx-auto mt-10 p-6 border border-gray-300 rounded-md bg-white-800 shadow">
        <h1 className="text-5xl font-bold font-semibold mb-6">Ask a public question</h1>

        {/* Title */}
        <div className="mb-6">
          <label className="font-bold block mb-1">Title</label>
          <p className="text-sm text-gray-600 mb-2">
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            type="text"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Body */}
        <div className="mb-6">
          <label className="font-bold block mb-1">Body</label>
          <p className="text-sm text-gray-600 mb-2">
            Include all the information someone would need to answer your question
          </p>
          <textarea
            rows="6"
            className="w-full p-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="font-bold block mb-1">Tags</label>
          <p className="text-sm text-gray-600 mb-2">
            Add up to 5 tags to describe what your question is about <br />
            e.g. <code>(xml typescript wordpress)</code>
          </p>
          <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-600 font-bold hover:text-red-800"
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
              placeholder="Type and press Enter..."
              className="flex-1 min-w-[120px] p-1 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Link to='/' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Post Your Question
        </Link>
      </div>
    </div>
  );
};

export default AskQuestionForm;

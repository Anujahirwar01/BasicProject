import React from "react";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";

const tags = [
  {
    name: "javascript",
    description:
      "For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript).",
  },
  {
    name: "python",
    description:
      "Python is a multi-paradigm, dynamically typed, multipurpose programming language. It enforces a clean and uniform syntax.",
  },
  {
    name: "c#",
    description:
      "C# is a high level, statically typed, multi-paradigm programming language developed by Microsoft.",
  },
  {
    name: "java",
    description:
      "Java is a high-level object oriented programming language. Use this tag for problems with the language itself.",
  },
  {
    name: "php",
    description:
      "PHP is a widely used, open source scripting language originally designed for server-side web development.",
  },
  {
    name: "html",
    description:
      "HTML is the markup language for creating web pages and other content for browsers.",
  },
  {
    name: "android",
    description:
      "Android is Google's mobile OS, used for smartphones, tablets, TVs, wearables, and more.",
  },
  {
    name: "css",
    description:
      "CSS is used to style HTML or XML documents, including colors, layout, and fonts.",
  },
  {
    name: "reactjs",
    description:
      "React is a JavaScript library for building user interfaces using a component-based paradigm.",
  },
  {
    name: "node.js",
    description:
      "Node.js is an asynchronous I/O runtime built on Chrome's V8 engine for scalable server-side development.",
  },
];

const Tag = () => {
  return (
    <div className="min-h-screen mt-20 ml-64 px-6  py-6">
        <Header />
        <Navbar />
      <h1 className="text-5xl font-bold mb-2">Tags</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>

      {/* Tag Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-blue-600 font-semibold mb-2 text-lg capitalize">
              {tag.name}
            </h2>
            <p className="text-sm text-gray-700">{tag.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;
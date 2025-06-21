import React from "react";

const Sidebar = () => {
  return (
    <div style={{
      width: "400px",
      border: "1px solid #ccc",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      backgroundColor: "#fff"
    }}>
      <SidebarSection
        title="The Overflow Blog"
        items={[
          { icon: "✎", text: "How Stack Overflow is partnering with Google to encourage socially..." },
          { icon: "✎", text: "Your whole repo fits in the context window" }
        ]}
      />
      <SidebarSection
        title="Featured on Meta"
        items={[
          { icon: "💬", text: "Our partnership with Google and commitment to socially responsible AI" },
          { icon: "💬", text: "Shifting the data dump schedule: A proposal" },
          { icon: "📄", text: "2024 Community Moderator Election Results" },
          { icon: "📄", text: "Temporary policy: Generative AI (e.g., ChatGPT) is banned" }
        ]}
      />
      <SidebarSection
        title="Hot Meta Post"
        items={[
          { icon: "✎", text: "Why are 'too localized' questions not welcome?" },
          { icon: "✎", text: "Question with many answers (that received hundreds of upvotes) which all..." }
        ]}
      />
      <WatchedTags />
    </div>
  );
};

const SidebarSection = ({ title, items }) => (
  <div style={{
    borderBottom: "1px solid #ccc",
    backgroundColor: "#fdf3d3",
    padding: "10px 12px"
  }}>
    <h4 style={{
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333"
    }}>{title}</h4>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{
          marginBottom: "8px",
          display: "flex",
          alignItems: "flex-start",
          gap: "6px",
          color: "#333"
        }}>
          <span>{item.icon}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const WatchedTags = () => {
  const tags = [
    "c", "css", "express", "firebase", "html",
    "java", "javascript", "mern", "mongodb",
    "mysql", "next.js", "node.js", "php",
    "python", "reactjs"
  ];

  return (
    <div style={{
      padding: "10px 12px",
      backgroundColor: "#fdf3d3"
    }}>
      <h4 style={{
        fontWeight: "bold",
        marginBottom: "10px",
        borderBottom: "1px solid #ccc",
        paddingBottom: "4px"
      }}>
        Watched Tags
      </h4>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
      }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            backgroundColor: "#eee",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#333"
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

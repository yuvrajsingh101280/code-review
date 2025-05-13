import React from "react";

const Loading = () => {
  return (
    <div className="loader-container">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="loader-bar"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default Loading;

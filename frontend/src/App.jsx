import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loading from "./components/Loading";

const App = () => {
  const [loader, setLoader] = useState(false); // Start with false
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [language, setLanguage] = useState("javascript");
  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    try {
      setLoader(true); // Show loader when request starts
      const response = await axios.post(
        "https://code-review-1-qc2x.onrender.com/ai/code-review",
        {
          code,
        }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error reviewing code:", error);
    } finally {
      setLoader(false); // Hide loader whether success or error
    }
  };

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              backgroundColor: "#000",
              color: "#fff",
              height: "100%",
              width: "100%",
              borderRadius: "0.7rem",
            }}
          />
        </div>
        <div className="review" onClick={reviewCode}>
          Review
        </div>
      </div>

      <div className="right">
        {loader ? (
          <Loading />
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
};

export default App;

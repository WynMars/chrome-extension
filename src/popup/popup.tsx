import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { fetchOpenaiData } from "../utils/api";

const App: React.FC<{}> = () => {
  const [apiKey, setApiKey] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["openaiApiKey"]).then(({ openaiApiKey }) => {
      setApiKey(openaiApiKey || "");
    });
  });

  const handleChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    chrome.storage.local.set({ openaiApiKey: apiKey });
    fetchOpenaiData(question, apiKey);
    // setQuestion("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Please Enter Your API Key</label>
        <input
          type="text"
          id="apiKey"
          name="apiKey"
          value={apiKey}
          onChange={handleChange}
        ></input>
        <label>Your Question</label>
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={handleQuestionChange}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

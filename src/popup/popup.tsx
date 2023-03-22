import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { fetchOpenaiData } from "../utils/api";


const App: React.FC<{}> = () => {
  const [apiKey, setApiKey] = useState("");
  const [question, setQuestion] = useState("");

  // useEffect(() => {
  //   chrome.storage.local.get(["openaiApiKey"]).then(({ openaiApiKey }) => {
  //     setApiKey(openaiApiKey || "");
  //   });
  // });

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

const handleCapture = (e) => {
  e.preventDefault();

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ['tesseract.min.js']
  // });

   chrome.tabs.captureVisibleTab(null, {}, function () {
     Tesseract.recognize(
       "https://tesseract.projectnaptha.com/img/eng_bw.png",
       "eng",
       { logger: (m) => console.log(m) }
     ).then(({ data: { text } }) => {
       console.log(text);
     });
   });

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
      <button onClick={handleCapture}>Capture</button>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

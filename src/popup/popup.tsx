import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { fetchOpenaiData } from "../utils/api";

const App: React.FC<{}> = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
chrome.storage.local.get(["openaiApiKey"]).then(({ openaiApiKey }) => {
  setApiKey(openaiApiKey || "");
});

  fetchOpenaiData("what is red");

  });

  const handleChange = (e) => {
    const openaiApiKey = e.target.value;
    setApiKey(e.target.value);
    chrome.storage.local.set({ openaiApiKey });
  };

  return (
    <div>
      <label>Please Enter Your API Key</label>
      <input
        type="text"
        id="apiKey"
        name="apiKey"
        value={apiKey}
        onChange={handleChange}
      ></input>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);

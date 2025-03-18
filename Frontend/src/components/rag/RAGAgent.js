import React, { useState } from "react";
import { ragService } from "../../features/rag/ragService";
import "./RAGAgent.css";

const RAGAgent = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleState = () => {
    setMessages((prev) => [...prev, prompt]);
    handleSendMessage();
  };

  const handleSendMessage = async () => {
    setLoading(true);
    // setMessages([...messages, prompt]);
    await ragService.getRag(prompt).then((res) => {
      console.log(res);
      setMessages((prev) => [...prev, res]);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="rag">
        <input
          type="text"
          placeholder="Enter your message"
          onChange={handleInputChange}
        />
        <button onClick={handleState} disabled={loading}>
          Send
        </button>
      </div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  );
};

export default RAGAgent;

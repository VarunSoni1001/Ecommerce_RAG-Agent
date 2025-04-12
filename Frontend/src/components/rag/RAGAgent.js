import React, { useState } from "react";
import { ragService } from "../../features/rag/ragService";
import "./RAGAgent.css";
import ReactMarkdown from "react-markdown";

const RAGAgent = ({ data = undefined, type = "single_product" }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const userMessage = { type: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const res = await ragService.getRag(userMessage.text, data, type);
      const ragMessage = { type: "rag", text: res };
      setMessages((prev) => [...prev, ragMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.type === "user" ? "user-message" : "rag-message"
            }`}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Enter your message"
          value={prompt}
          onChange={handleInputChange}
          disabled={loading}
          onSubmit={handleSendMessage}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default RAGAgent;

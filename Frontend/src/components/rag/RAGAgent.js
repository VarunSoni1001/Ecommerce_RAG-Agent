import React, { useState, useRef, useEffect } from "react";
import { ragService } from "../../features/rag/ragService";
import "./RAGAgent.css";
import ReactMarkdown from "react-markdown";
import { AiFillCloseCircle } from "react-icons/ai";

const RAGAgent = ({
  data = undefined,
  type = "single_product",
  showRAGAgent,
  setShowRAGAgent,
}) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (showRAGAgent) {
      // Prevent background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when closed
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showRAGAgent]);

  const handleInputChange = (e) => setPrompt(e.target.value);

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const userMessage = { type: "user", text: prompt, date: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const res = await ragService.getRag(userMessage.text, data, type);
      const ragMessage = { type: "rag", text: res, date: new Date() };
      setMessages((prev) => [...prev, ragMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-container ${showRAGAgent ? "show-agent" : ""}`}>
      <button className="close-button" onClick={() => setShowRAGAgent(false)}>
        <AiFillCloseCircle size={28} />
      </button>
      <div className="hero-section">
        <h2 className="hero-title">Hi! I am a RAGAgent</h2>
        <p className="hero-subtitle">
          Ask me anything about the{" "}
          {type === "store"
            ? "store information (like about store, privacy policy, return policy, contact details, etc"
            : type === "many_products"
            ? "products displaying on your screen"
            : "product you looking at"}
          .
        </p>
      </div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.type === "user" ? "user-message" : "rag-message"
            }`}
            ref={messagesEndRef}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
            {message.date && (
              <div
                className={message.type === "user" ? "user-date" : "rag-date"}
              >
                {new Date(message.date).toLocaleString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "numeric",
                  month: "short",
                })}
              </div>
            )}
          </div>
        ))}
        {/* <div ref={messagesEndRef} /> */}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Enter your message"
          value={prompt}
          onChange={handleInputChange}
          disabled={loading}
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

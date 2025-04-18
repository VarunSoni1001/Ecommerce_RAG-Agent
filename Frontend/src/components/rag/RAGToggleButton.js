import React from "react";
import "./RAGToggleButton.css";
import { RiAiGenerate } from "react-icons/ri";

export const RAGToggleButton = ({ showRAGAgent, setShowRAGAgent }) => {
  if (showRAGAgent) return null;
  return (
    <div className="rag-toggle-wrapper">
      <button
        className={`rag-toggle-button center`}
        onClick={() => setShowRAGAgent(!showRAGAgent)}
      >
        <RiAiGenerate size={24} />
        Ask<b>RAGAgent</b>
        <sup>AI</sup>
      </button>
    </div>
  );
};

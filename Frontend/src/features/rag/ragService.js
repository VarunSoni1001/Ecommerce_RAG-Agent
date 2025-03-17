import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getRag = async (
  // data,
  prompt
) => {
  // const promptArray = [
  //   `You are an e-commerce support assistant. Answer based on this info: ${data}`,
  //   `User query: ${prompt}`,
  // ];
  try {
    const result = await model.generateContent(
      prompt,
      // promptArray,
      {
        max_tokens: 100,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }
    );
    const response = await result.response.text();
    return response;
  } catch (error) {
    console.error("Error fetching RAG response:", error);
    return "Error generating response";
  }
};

export const ragService = {
  getRag,
};

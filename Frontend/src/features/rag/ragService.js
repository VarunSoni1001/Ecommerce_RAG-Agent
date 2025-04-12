import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storeInfoSystemInstruction = (data) => `
You are an assistant for an e-commerce platform. Use the following store information to answer customer queries accurately.

Only answer questions related to the store's identity, policies, address, or contact.

If a query is unrelated to this store information, say: "Sorry, I can’t help with that based on the information I have."

Store Info Format:
- About: ${data.about}
- Contact Details: ${JSON.stringify(data.contact_details, null, 2)}
- Address: ${data.address}
- Privacy Policy: ${data.privacy_policy}
- Return Policy: ${data.return_policy}
`;

const productsListSystemInstruction = (data) => `
You are an assistant for an online store. You have access to a catalog of products.

When a customer asks for product suggestions, filtering (like category, brand, price), or browsing, refer to the product list provided.

Do not hallucinate product features or names. Only recommend from the list.

Here's the product list:
${JSON.stringify(data, null, 2)}

Each product includes:
- Name
- Category
- Price
- Description
- Tags
- Rating
- Availability

You may present products in a list format or guide the user to a specific category.

If no products match, say: "No products found matching your request."
`;

const singleProductSystemInstruction = (data) => `
You are an expert assistant for a single product.

Answer only based on the product information provided. Do not generate extra specifications unless included.

Use this info to respond to questions about this specific product's features, materials, usage, pricing, or availability.

If the user asks about something not present in the product info, say: "That detail isn't available for this product."

Product Format:
- Name: ${data.name}
- Description: ${data.description}
- Features: ${data.features}
- Price: ${data.price}
- In Stock: ${data.in_stock}
- Reviews: ${data.reviews}
- Brand: ${data.brand}
- Category: ${data.category}
`;

const getRag = async (
  prompt,
  data = undefined,
  type // "store" | "many_products" | "single_product"
) => {
  let systemInstruction = "";

  if (type !== "" && !data) {
    throw new Error("Data is required when type is specified.");
  }

  // Set system instruction based on type
  switch (type) {
    case "store":
      systemInstruction = storeInfoSystemInstruction(data);
      break;
    case "many_products":
      systemInstruction = productsListSystemInstruction(data);
      break;
    case "single_product":
      systemInstruction = singleProductSystemInstruction(data);
      break;
    default:
      throw new Error("Invalid system instruction type.");
  }

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.5,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
      },
      systemInstruction,
    });

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

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { makeQuestion } from "./question.js";

// Initialize Gemini client with your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  // Instruction to restrict the model to geography topics
  const instruction = `
    You are a helpful geography assistant.
    Only answer questions that are related to geography.
    If the question is unrelated, politely respond:
    "I'm sorry, I can only assist with geography-related questions."
  `;

  // Prompt setup: Add instruction and user input
  const userInput = await makeQuestion("Ask your geography question: ");
  const prompt = `${instruction}\n\nUser: ${userInput}`;

  // Make the LLM call
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  // Output the response from the model
  console.log("\nAI Response:");
  console.log(response.text);
}

await main();

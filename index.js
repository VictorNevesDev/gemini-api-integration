import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

import { makeQuestion } from "./question.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {

  let prompt = "Only answer geography related questions. If the questions is not related to geography, tell the user that you can't answer the question" +
  "The user asked: "

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt + await makeQuestion("Where Philipines is located? "),
  });
  console.log(response.text);
}

await main();

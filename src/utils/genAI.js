// https://ai.google.dev/gemini-api/docs/quickstart#make-first-request
import { ai } from "../config/gemini.js";

/**
 * Requesting response from Generative AI model.
 * @param {string} prompt - Media or text as prompts for AI models.
 */
export async function genAI(prompt) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,
  });
  return response.text;
}
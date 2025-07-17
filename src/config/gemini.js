import { GoogleGenAI } from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
// https://ai.google.dev/gemini-api/docs/quickstart#make-first-request
export const ai = new GoogleGenAI({});
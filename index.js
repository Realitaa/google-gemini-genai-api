import express from 'express';
import 'dotenv/config';
// import multer from 'multer';
// import path from 'node:path';
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
const port = process.env.PORT;

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function genAI(prompt) {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });
    return response.text;
  }

app.get('/', (req, res) => {
  res.send('Hello Gemini!')
})

app.listen(port, () => {
  console.log(`Gemini API server is running at http://localhost:${port}`);
})
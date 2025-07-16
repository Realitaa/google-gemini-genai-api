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

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const result = await genAI(prompt);
    res.json({
        status: 'success',
        result
    });
  } catch (error) {
    res.status(500).json({
      status: 'success',
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Gemini API server is running at http://localhost:${port}`);
})
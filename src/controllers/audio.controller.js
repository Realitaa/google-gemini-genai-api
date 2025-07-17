import { ai } from "../config/gemini.js";
import { createUserContent, createPartFromUri } from "@google/genai";
import { genAI } from "../utils/genAI.js";
import { deleteFile } from '../utils/deleteFile.js';

export async function generateFromAudio(req, res) {
    // Get the audio path
    const filePath = req.file?.path;
    
      try {
        const prompt = req.body.prompt || 'Describe this audio clip in 3 sentences.';

        // Make sure the file uploaded
        if (!req.file) {
          return res.status(400).json({
            status: 'error',
            message: 'No audio uploaded.',
          });
        }

        // Read audio as base64: https://ai.google.dev/gemini-api/docs/audio#inline-audio
        const base64AudioFile = fs.readFileSync(filePath, {
          encoding: 'base64',
        });

        // Return server error if base64 encoding fail
        if (!base64AudioFile) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to read the uploaded audio file.',
            });
        }
    
        // Create prompt from image and text content
        const contents = [
          { text: prompt },
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: base64AudioFile,
            },
          },
        ];
    
        const result = await genAI(contents);
    
        res.json({
          status: 'success',
          result,
        });
    
        deleteFile(filePath);
    } catch (error) {
        res.status(500).json({
          status: 'error',
          message: error.message || 'Internal Server Error',
        });

        deleteFile(filePath);
    
      }
}
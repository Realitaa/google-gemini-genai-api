import { genAI } from "../utils/genAI.js";
import { deleteFile } from '../utils/deleteFile.js';
import fs from 'node:fs';

export async function generateFromImage(req, res) {
    // Get the image path
    const filePath = req.file.path;

    try {
        const prompt = req.body.prompt || 'Describe this image in 3 sentences.';
        
        // Make sure the file uploaded
        if (!req.file) {
          return res.status(400).json({
            status: 'error',
            message: 'No image file uploaded.',
          });
        }
  
        // Read image as base64: https://ai.google.dev/gemini-api/docs/image-understanding#inline-image
        const base64ImageFile = fs.readFileSync(filePath, {
          encoding: 'base64',
        });
  
        // Return server error if base64 encoding fail
        if (!base64ImageFile) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to read the uploaded image file.',
            });
        }
  
        // Create prompt from image and text content
        const contents = [
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: base64ImageFile,
            },
          },
          { text: prompt },
        ];
  
        const result = await genAI(contents);
  
        res.json({
          status: 'success',
          result,
        });
  
        deleteFile(filePath);
    } catch (err) {
        res.status(500).json({
          status: 'error',
          message: err.message || 'Internal Server Error',
        });
  
        deleteFile(filePath);
    }
}
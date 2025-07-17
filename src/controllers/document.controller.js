import { genAI } from "../utils/genAI.js";
import { deleteFile } from '../utils/deleteFile.js';
import fs from 'node:fs';

export async function generateFromDocument(req, res) {
    // Get the document path
    const filePath = req.file?.path;
    
      try {
        const prompt = req.body.prompt || 'Summarize this document in 3 sentences.';

        // Make sure the file uploaded
        if (!req.file) {
          return res.status(400).json({
            status: 'error',
            message: 'No document uploaded.',
          });
        }
    
        // Read document as base64: https://ai.google.dev/gemini-api/docs/document-processing#inline_data
        const fileBuffer = fs.readFileSync(filePath);
        const base64 = fileBuffer.toString("base64");
    
        // Create prompt from document and text content
        const contents = [
          { text: prompt },
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: base64,
            },
          },
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
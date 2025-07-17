import { genAI } from "../utils/genAI.js";

export async function generateText(req, res) {
    // Get prompt from request body
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
}
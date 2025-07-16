import express from 'express';
import 'dotenv/config';
import multer from 'multer';
import path from 'path';
import fs from 'node:fs';
import { GoogleGenAI } from "@google/genai";

// Setup storage destination & filename
const uploadsDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // simpan ke folder uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Express configuration
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

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  try {
    const prompt = req.body.prompt || 'Describe this image in 3 sentences.';

    // Pastikan file terupload
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file uploaded.',
      });
    }

    const image = req.file.path;

    // Baca file sebagai base64
    const base64ImageFile = fs.readFileSync(image, {
      encoding: 'base64',
    });

    if (!base64ImageFile) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to read the uploaded image file.',
      });
    }

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

    // Hapus file setelah response berhasil dikirim
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Gagal menghapus file:', err);
      } else {
        console.log('File berhasil dihapus:', imagePath);
      }
    });
  } catch (err) {
    console.error('Error in /generate-from-image:', err);
    res.status(500).json({
      status: 'error',
      message: err.message || 'Internal Server Error',
    });

    // Hapus file jika error jika file berhasil di upload
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Gagal menghapus file saat error:', err);
      });
    }
  }
});  

app.listen(port, () => {
  console.log(`Gemini API server is running at http://localhost:${port}`);
})
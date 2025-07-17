// src/config/multer.js
import multer from 'multer';
import fs from 'node:fs';
import path from 'path';

const uploadsDir = path.resolve('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Make sure folder 'uploads' availabe
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Upload image configuration
const uploadImg = multer({
  storage,
  // Max size 20MB including image and prompt: https://ai.google.dev/gemini-api/docs/image-understanding#image-input
  limits: { fileSize: 18 * 1024 * 1024 }, // Max 18MB for file only, 2MB reserved for body or header
  fileFilter: (req, file, cb) => {
    // Supported image format: https://ai.google.dev/gemini-api/docs/image-understanding#supported-formats
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/heic', 'image/heif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, JPEG, HEIC and HEIF image files are allowed!'), false);
    }
  },
});


// Upload document configuration
const uploadDoc = multer({
  storage,
  // Max document size 20MB to match other configuration.
  // Technical detail: https://ai.google.dev/gemini-api/docs/document-processing#technical-details
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    // Best supported format is PDF
    // Supported document format: https://ai.google.dev/gemini-api/docs/document-processing#document-types
    const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown', 'text/html', 'application/xml', 'text/xml'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, TXT, MD, HTML, XML and XML document files are allowed!'), false);
    }
  },
});

// Upload audio configuration
const uploadAudio = multer({
  storage,
  // Max size 20MB including audio and prompt: https://ai.google.dev/gemini-api/docs/audio?hl=id#inline-audio
  // Technical detail: https://ai.google.dev/gemini-api/docs/audio#technical-details
  limits: { fileSize: 18 * 1024 * 1024 }, // Max 18MB for file only, 2MB reserved for body or header
  fileFilter: (req, file, cb) => {
    // Supported audio format: https://ai.google.dev/gemini-api/docs/audio#supported-formats
    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/aiff', 'audio/aac', 'audio/ogg', 'audio/flac'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only WAV, MP3, AIFF, AAC, OGG and FLAC audio files are allowed!'), false);
    }
  },
});

export { uploadImg, uploadDoc, uploadAudio };
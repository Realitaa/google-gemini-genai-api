import express from 'express';
import { generateText } from '../controllers/text.controller.js';
import { generateFromImage } from '../controllers/image.controller.js';
import { generateFromDocument } from '../controllers/document.controller.js';
import { generateFromAudio } from '../controllers/audio.controller.js';
import { uploadImg, uploadDoc, uploadAudio } from '../config/multer.js';

const router = express.Router();

router.get('/', (res) => res.send('Hello Gemini! Read README.md in root file for instruction.'));
router.post('/generate-text', generateText);
router.post('/generate-from-image', uploadImg.single('image'), generateFromImage);
router.post('/generate-from-document', uploadDoc.single('document'), generateFromDocument);
router.post('/generate-from-audio', uploadAudio.single('audio'), generateFromAudio);

export default router;

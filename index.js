// index.js
import 'dotenv/config';
import app from './src/app.js';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Gemini API server is running at http://localhost:${port}`);
});

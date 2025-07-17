# Google Gemini Generative AI API

A simple Node.js and Express.js REST API for interacting with Google's Gemini Genai model. This server provides endpoints to generate content from various inputs including text, images, documents, and audio files.

## Table of Contents

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Generate from Text](#generate-from-text)
  - [Generate from Image](#generate-from-image)
  - [Generate from Document](#generate-from-document)
  - [Generate from Audio](#generate-from-audio)
- [Testing](#testing)
- [Sample](#sample)
- [License](#license)

## About The Project

This project is an Express.js server that acts as a backend wrapper for the Google Gemini API. It simplifies multimodal interactions by providing dedicated RESTful endpoints for different types of prompts. It uses `multer` for handling file uploads for images, documents, and audio.

Key technologies used:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **@google/genai**: Google's official Node.js client for the Gemini API.
- **Multer**: Middleware for handling `multipart/form-data`, used for file uploads.
- **Dotenv**: Loads environment variables from a `.env` file.

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- **Node.js**: Version 18.x or newer is recommended.
- **npm** or **yarn**: Package manager for Node.js.
- **Google Gemini API Key**: You'll need an API key to communicate with the Gemini models. You can obtain one from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Realitaa/google-gemini-genai-api.git
    cd google-gemini-genai-api
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```sh
    cp .env.example .env
    ```

4.  **Add your API key:**
    Open the newly created `.env` file and add your Google Gemini API key.
    ```env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

## Usage

You can run the server in two modes:

- **Development Mode**: Uses `nodemon` to automatically restart the server on file changes.
  ```sh
  npm run dev
  ```

- **Production Mode**: Runs the server using `node`.
  ```sh
  npm start
  ```

By default, the server will be running at `http://localhost:3000`.

## API Endpoints

All endpoints handle `POST` requests and return a JSON response with response status and model response.

### Generate from Text

Generates a text response from a given text prompt.

- **URL**: `/generate-text`
- **Method**: `POST`
- **Body**: `application/json`
  ```json
  {
    "prompt": "Explain how AI works in a few words."
  }
  ```

### Generate from Image

Generates a text response based on an image and an optional text prompt.

- **URL**: `/generate-from-image`
- **Method**: `POST`
- **Body**: `multipart/form-data`
  - `prompt` (string, optional): The question or instruction related to the image (e.g., "Describe this image in 3 sentences.").
  - `image` (file): The image file (e.g., .png, .jpeg).

### Generate from Document

Generates a text response (e.g., a summary) from a document and a prompt.

- **URL**: `/generate-from-document`
- **Method**: `POST`
- **Body**: `multipart/form-data`
  - `prompt` (string, optional): The question or instruction for the document (e.g., "Summarize this document in 3 sentences.").
  - `document` (file): The document file.

### Generate from Audio

Generates a text response by transcribing or summarizing an audio file.

- **URL**: `/generate-from-audio`
- **Method**: `POST`
- **Body**: `multipart/form-data`
  - `prompt` (string, optional): The instruction for the audio (e.g., "Transcribe this audio in 3 sentences.").
  - `audio` (file): The audio file (e.g., .mp3, .wav, .mpeg).

## Testing

A Postman collection is included in the repository to make testing the API endpoints straightforward.

1.  Open your Postman application.
2.  Import the [`Gemini API.postman_collection.json`](test/) file to your Postman collection.
3.  You can now use the pre-configured requests to test each endpoint. Ensure your local server is running.

## Sample

I have prepared document, image and audio for testing purpose [here](sample/).

## License

This project is licensed under the MIT License.


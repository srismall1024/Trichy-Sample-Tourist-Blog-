// server.js
import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files from public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// 🔑 Replace with your Gemini API key
const GEMINI_API_KEY = "AIzaSyCXIY6bDHz9-RNc8Sjl63xNwjVeS3vYx6o";

// Endpoint for Gemini
app.post("/askGemini", async (req, res) => {
  const userInput = req.body.input;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "You are a friendly Trichy Travel Assistant. Help tourists with distances, places, and travel tips about Trichy. User: " +
                    userInput
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      res.json({ reply: data.candidates[0].content.parts[0].text });
    } else {
      res.json({ reply: "🤔 Gemini didn't return a valid response." });
    }
  } catch (err) {
    res.json({ reply: "⚠️ Error: " + err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

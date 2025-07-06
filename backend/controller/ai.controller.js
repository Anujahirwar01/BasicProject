// controllers/aiController.js

import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAIAnswer = async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ error: "Question is required" });

  try {
    const prompt = `Provide a beginner-friendly answer to the following programming question:\n\n"${question}"`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({ answer: aiResponse });
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ error: "AI failed to generate response" });
  }
};

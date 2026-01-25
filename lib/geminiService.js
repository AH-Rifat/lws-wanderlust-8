// lib\geminiService.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateTravelPlan(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // or "gemini-2.5-flash-lite"
      contents: [{ text: prompt }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    return (
      response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || ""
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}

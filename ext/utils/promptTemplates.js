import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);


// Use the "JSON_OBJECT" response mime type to force valid JSON
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

export async function analyzeScamMessage(text) {
  const prompt = `
    Analyze this message for scam indicators: "${text}"
    Return JSON:
    {
      "risk": "Low" | "Medium" | "High",
      "highlights": [{ "text": "string", "reason": "string" }],
      "nextSteps": ["string"]
    }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  // Extra safety: Remove markdown formatting if the model adds it anyway
  const cleanJson = responseText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanJson);
}

export async function analyzeJobOffer(payload) {
  const prompt = `
    Analyze this job:
    Description: "${payload.job}"
    Message: "${payload.message}"
    Email: "${payload.email}"
    
    Return JSON:
    {
      "risk": "Low" | "Medium" | "High",
      "redFlags": ["string"],
      "education": "string"
    }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const cleanJson = responseText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanJson);
}
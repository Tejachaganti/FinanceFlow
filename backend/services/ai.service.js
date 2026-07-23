import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIResponse = async (message) => {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: `
You are FinanceFlow AI, a smart financial assistant.

Help users with:
- Budgeting
- Expense tracking
- Savings
- Financial planning
- Spending insights

User: ${message}
`,
  });

  return response.text;
};

export const extractExpenseFromText = async (transcript) => {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: `
You are an AI that extracts expense information.

Return ONLY valid JSON.

Schema:
{
  "title": "",
  "amount": 0,
  "category": "",
  "merchant": "",
  "date": ""
}

Rules:
- amount must be a number only
- category should be one of:
  Food
  Transport
  Shopping
  Entertainment
  Bills
  Health
  Education
  Travel
  Salary
  Other
- merchant should be empty if unknown
- date should be YYYY-MM-DD
- If no date is mentioned, use today's date.
- Do not include markdown.
- Do not include explanations.

Transcript:
${transcript}
`,
  });

  const text = response.text.trim();

  // Remove Markdown code fences if Gemini returns them
  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(clean);
};
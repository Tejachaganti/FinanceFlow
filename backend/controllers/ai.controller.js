import {
  generateAIResponse,
  extractExpenseFromText,
} from "../services/ai.service.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await generateAIResponse(message);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const extractExpense = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    const expense = await extractExpenseFromText(transcript);

    res.json({
      success: true,
      expense,
    });
  } catch (error) {
    console.error("Expense Extraction Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
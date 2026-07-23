const { InferenceClient } = require("@huggingface/inference");
const AiChat = require("../models/AiChat");

const client = new InferenceClient(process.env.HF_TOKEN);

// Send prompt to Hugging Face and store for logged-in user
const generateAiResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user._id; // Extracted from JWT in protect middleware

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Call Hugging Face API
    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const aiMessage = response.choices[0].message.content;

    // Save history specifically for this user
    const chatLog = await AiChat.create({
      userId,
      prompt,
      response: aiMessage,
    });

    res.status(200).json({
      success: true,
      data: chatLog,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve chat history ONLY for the logged-in user
const getUserAiHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await AiChat.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateAiResponse,
  getUserAiHistory,
};
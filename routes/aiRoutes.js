const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { generateAiResponse, getUserAiHistory } = require("../controllers/aiController");

// Protected routes (Requires Auth Header/Token)
router.post("/generate", protect, generateAiResponse);
router.get("/history", protect, getUserAiHistory);

module.exports = router;
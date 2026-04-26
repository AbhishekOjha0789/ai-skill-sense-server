const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getSettings,
  updateSettings,
  resetSettings
} = require("../controllers/settingsController");

// Get settings
router.get("/:email", protect, getSettings);

// Update settings
router.post("/", protect, updateSettings);

// Reset settings
router.post("/reset/:email", protect, resetSettings);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getSettings,
  updateSettings,
  resetSettings
} = require("../controllers/settingsController");

// Get settings
router.get("/:email", getSettings);

// Update settings
router.post("/", updateSettings);

// Reset settings
router.post("/reset/:email", resetSettings);

module.exports = router;
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createActivity,
  getUserActivities,
  deleteActivity
} = require("../controllers/activityController");

// Create log
router.post("/", protect, createActivity);

// Get user logs
router.get("/:email", protect, getUserActivities);

// Delete log (optional)
router.delete("/:id", protect, deleteActivity);

module.exports = router;
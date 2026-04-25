const express = require("express");
const router = express.Router();

const {
  createActivity,
  getUserActivities,
  deleteActivity
} = require("../controllers/activityController");

// Create log
router.post("/", createActivity);

// Get user logs
router.get("/:email", getUserActivities);

// Delete log (optional)
router.delete("/:id", deleteActivity);

module.exports = router;
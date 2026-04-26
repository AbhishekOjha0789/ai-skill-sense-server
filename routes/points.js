const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import controller
const { addPoints, getPoints } = require("../controllers/pointsController");

router.post("/", protect, addPoints);
router.get("/:email", protect, getPoints);

module.exports = router;
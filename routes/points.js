const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import controller
const { addPoints } = require("../controllers/pointsController");

router.post("/add", protect, addPoints);

module.exports = router;
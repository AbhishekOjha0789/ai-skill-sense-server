const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addPoints,
  getPoints,
  initializePoints
} = require("../controllers/pointsController");

router.post("/", protect, addPoints);
router.get("/:email", protect, getPoints);
router.post("/init", protect, initializePoints);

module.exports = router;
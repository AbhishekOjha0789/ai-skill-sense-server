const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { signup, login } = require("../controllers/authController");

// routes
router.post("/signup", protect, signup);
router.post("/login", protect, login);

module.exports = router;
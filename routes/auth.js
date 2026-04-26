const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { signup, login } = require("../controllers/authController");

// routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
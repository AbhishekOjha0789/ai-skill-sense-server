const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  saveProfile
} = require("../controllers/userController");

router.get("/:email", protect, getProfile);

router.post("/", protect, saveProfile);

module.exports = router;
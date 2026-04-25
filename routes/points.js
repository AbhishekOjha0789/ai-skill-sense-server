const express = require("express");
const router = express.Router();

// Import controller
const { addPoints } = require("../controllers/pointsController");

router.post("/add", addPoints);

module.exports = router;
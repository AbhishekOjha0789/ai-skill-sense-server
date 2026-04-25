const express = require("express");
const router = express.Router();

const {
  getProfile,
  saveProfile
} = require("../controllers/userController");

router.get("/:email", getProfile);

router.post("/", saveProfile);

module.exports = router;
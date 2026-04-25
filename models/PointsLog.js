const mongoose = require("mongoose");

const PointsLogSchema = new mongoose.Schema({
  id: Number,
  userEmail: String,
  amount: Number,
  createdAt: Number,
  desc: String,
});

module.exports = mongoose.model("PointsLog", PointsLogSchema);
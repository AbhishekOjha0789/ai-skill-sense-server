const mongoose = require("mongoose");
//const { use } = require("react");

const PointsSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
  prof: { type: Number, default: 0 },
  personal: { type: Number, default: 0 },
  health: { type: Number, default: 0 },
  userEmail: String
});

module.exports = mongoose.model("Points", PointsSchema);
const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
  aid: Number,
  userEmail: String,
  type: String,
  activity: String,
  createdAt: Number,
});

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
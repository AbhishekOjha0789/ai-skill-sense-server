const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userEmail: String,
  theme: String,
  notificationsEnabled: Boolean
});

module.exports = mongoose.model("Settings", SettingsSchema);
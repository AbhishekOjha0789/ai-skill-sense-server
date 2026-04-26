const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  name:  { type: String, trim: true },
  pin:   { type: String },   // hashed value is always a string
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
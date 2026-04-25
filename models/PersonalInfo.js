const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
  userEmail: String,
  username: String,
  fullname: String,
  gender: String,
  age: Number,
  location: String,
  bio: String,
  interests: String,
  profilePicture: String
});

module.exports = mongoose.model("PersonalInfo", PersonalInfoSchema);
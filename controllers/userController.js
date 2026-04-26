const PersonalInfo = require("../models/PersonalInfo");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const email = req.params.email;

    const data = await PersonalInfo.findOne({ userEmail: email });

    if (!data) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SAVE / UPDATE PROFILE
const saveProfile = async (req, res) => {
  try {
    // take email from verified JWT token
    const userEmail = req.user.email;

    const updatedData = {
      ...req.body,
      userEmail,
    };

    const data = await PersonalInfo.findOneAndUpdate(
      { userEmail },
      updatedData,
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      message: "Profile saved successfully",
      data,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  getProfile,
  saveProfile
};
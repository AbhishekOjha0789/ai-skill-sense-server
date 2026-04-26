const Settings = require("../models/Settings");

// GET SETTINGS
const getSettings = async (req, res) => {
  try {
    // use email from verified JWT
    const email = req.user.email;

    const settings = await Settings.findOne({
      userEmail: email
    });

    if (!settings) {
      return res.status(404).json({
        message: "Settings not found"
      });
    }

    res.json(settings);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// CREATE / UPDATE SETTINGS
const updateSettings = async (req, res) => {
  try {
    // secure email from JWT
    const userEmail = req.user.email;

    const {
      theme,
      notificationsEnabled
    } = req.body;

    const updated = await Settings.findOneAndUpdate(
      { userEmail },
      {
        userEmail,
        theme,
        notificationsEnabled
      },
      {
        upsert: true,
        new: true
      }
    );

    res.json({
      message: "Settings updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// RESET SETTINGS
const resetSettings = async (req, res) => {
  try {
    // secure email from JWT
    const email = req.user.email;

    const defaultSettings = await Settings.findOneAndUpdate(
      { userEmail: email },
      {
        userEmail: email,
        theme: "light",
        notificationsEnabled: true
      },
      {
        upsert: true,
        new: true
      }
    );

    res.json({
      message: "Settings reset to default",
      data: defaultSettings
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  resetSettings
};
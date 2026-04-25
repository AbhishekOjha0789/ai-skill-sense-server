const ActivityLog = require("../models/ActivityLog");

// CREATE ACTIVITY LOG
const createActivity = async (req, res) => {
  try {
    const { id, userEmail, type, activity, createdAt } = req.body;

    if (!userEmail || !type || !activity) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const log = new ActivityLog({
      aid: id,
      userEmail,
      type,
      activity,
      createdAt: createdAt || Date.now()
    });

    await log.save();

    res.status(201).json({
      message: "Activity logged successfully",
      data: log
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ACTIVITY FOR USER
const getUserActivities = async (req, res) => {
  try {
    const email = req.params.email;

    const logs = await ActivityLog.find({ userEmail: email })
      .sort({ createdAt: -1 });

    res.json(logs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ACTIVITY (optional admin/debug use)
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await ActivityLog.findByIdAndDelete(id);

    res.json({ message: "Activity deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createActivity,
  getUserActivities,
  deleteActivity
};
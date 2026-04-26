const ActivityLog = require("../models/ActivityLog");

// CREATE ACTIVITY LOG
const createActivity = async (req, res) => {
  try {
    // secure email from JWT
    const userEmail = req.user.email;

    const {
      id,
      type,
      activity,
      createdAt
    } = req.body;

    if (!type || !activity) {
      return res.status(400).json({
        message: "Required fields missing"
      });
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
    res.status(500).json({
      error: err.message
    });
  }
};

// GET USER ACTIVITIES
const getUserActivities = async (req, res) => {
  try {
    // secure email from JWT
    const email = req.user.email;

    const logs = await ActivityLog.find({
      userEmail: email
    }).sort({
      createdAt: -1
    });

    res.json(logs);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// DELETE ACTIVITY
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await ActivityLog.findByIdAndDelete(id);

    res.json({
      message: "Activity deleted"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createActivity,
  getUserActivities,
  deleteActivity
};
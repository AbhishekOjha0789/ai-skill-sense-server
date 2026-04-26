const Points = require("../models/Points");
const PointsLog = require("../models/PointsLog");

// ADD POINTS
const addPoints = async (req, res) => {
  try {
    // secure email from JWT
    const userEmail = req.user.email;

    const {
      id,
      amount,
      createdAt,
      desc
    } = req.body;

    if (amount == null) {
      return res.status(400).json({
        message: "Amount is required"
      });
    }

    // 1. Update total points
    const updated = await Points.findOneAndUpdate(
      { userEmail },
      {
        $inc: {
          total: amount
        }
      },
      {
        upsert: true,
        new: true
      }
    );

    // 2. Save points log
    await PointsLog.create({
      id,
      userEmail,
      amount,
      createdAt: createdAt || Date.now(),
      desc: desc || "No description provided"
    });

    res.status(200).json({
      message: "Points added successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addPoints
};
const Points = require("../models/Points");
const PointsLog = require("../models/PointsLog");

// Add points function
const addPoints = async (req, res) => {
  try {
    const { id, userEmail, amount, createdAt, desc } = req.body;

    if (!userEmail || !amount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1. Update total points
    const updated = await Points.findOneAndUpdate(
      { userEmail },
      { $inc: { total: amount } },
      { upsert: true, new: true }
    );

    // 2. Log history
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPoints };
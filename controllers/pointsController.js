const Points = require("../models/Points");
const PointsLog = require("../models/PointsLog");

// INITIALIZE DEFAULT POINTS
const initializePoints = async (req, res) => {
  try {
    // secure email from JWT
    const userEmail = req.user.email;

    // check if already exists
    const existing = await Points.findOne({ userEmail });

    if (existing) {
      return res.status(200).json({
        message: "Points already initialized",
        data: existing
      });
    }

    // create default values
    const created = await Points.create({
      userEmail,
      total: 0,
      prof: 0,
      personal: 0,
      health: 0
    });

    res.status(201).json({
      message: "Points initialized successfully",
      data: created
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

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

// GET POINTS
const getPoints = async (req, res) => {
  try {
    const { email } = req.params;

    const points = await Points.findOne({ userEmail: email });
    
    if (!points) {
      return res.status(404).json({
        message: "Points not found"
      });
    }

    res.status(200).json(points);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addPoints,
  getPoints,
  initializePoints
};
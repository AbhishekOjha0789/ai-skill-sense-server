const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP CONTROLLER
const signup = async (req, res) => {
  const { email, name, pin } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash pin
    const hashedPin = await bcrypt.hash(pin, 10);

    // create user
    const user = new User({
      email,
      name,
      pin: hashedPin
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, pin } = req.body;

  try {
    const user = await User.findOne({ email });

    // check user exists
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    // compare entered pin with hashed pin
    const isMatch = await bcrypt.compare(
      pin.toString(),
      user.pin
    );

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    // CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  signup,
  login
};
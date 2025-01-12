const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: null, message: "User not found" });
    }

    // check password using bcryptJS
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: null, message: "Invalid credentials" });
    }

    // create and send JWT token with one year expiration
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    // setting cookie with expiration of 1 year
    res.cookie("token", token, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      httpOnly: true, // false for dev
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", // Lax for dev
    });
    res.json({
      error: null,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Invalid login" });
  }
};

// register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: null, message: "Email already exists" });
    }

    // create a new user
    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    // save the user to the database
    await newUser.save();

    res.json({
      error: null,
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Invalid registration" });
  }
};

// logout the user

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ error: null, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to log out" });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    res.json({ error: null, user });
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to get user" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
};

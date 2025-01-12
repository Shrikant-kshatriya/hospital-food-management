const { request } = require("express");
const Pantry = require("../models/Pantry.js");
const User = require("../models/User.js");

// add new pantry staff
const createPantryStaff = async (req, res) => {
  try {
    const { name, email, password, role, phone, location } = req.body;
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
    const pantryStaff = new Pantry({
      userID: newUser._id,
      name: newUser.name,
      phone,
      location,
    });
    await pantryStaff.save();
    res
      .status(201)
      .json({ message: "Pantry staff created successfully", pantryStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update pantry staff details
const updatePantryStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const pantryStaff = await Pantry.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!pantryStaff) {
      return res
        .status(404)
        .json({ error: null, message: "Pantry staff not found" });
    }

    // update user name in User model if provided in request body
    if (req.body.name) {
      await User.findByIdAndUpdate(pantryStaff.userID, { name: req.body.name });
    }
    res
      .status(200)
      .json({ message: "Pantry staff updated successfully", pantryStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete pantry staff

const deletePantryStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const pantryStaff = await Pantry.findByIdAndDelete(id);

    if (!pantryStaff) {
      return res
        .status(404)
        .json({ error: null, message: "Pantry staff not found" });
    }

    await User.findByIdAndDelete(pantryStaff.userID);

    res.status(200).json({ message: "Pantry staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get pantry staff

const getPantryStaff = async (req, res) => {
  try {
    const pantryStaff = await Pantry.find();
    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get pantry staff by ID

const getPantryStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const pantryStaff = await Pantry.findOne({userID: id});

    if (!pantryStaff) {
      return res
        .status(404)
        .json({ error: null, message: "Pantry staff not found" });
    }

    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPantryStaff,
  updatePantryStaff,
  deletePantryStaff,
  getPantryStaff,
  getPantryStaffById,
};

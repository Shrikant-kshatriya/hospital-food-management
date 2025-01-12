const DeliveryPersonnel = require("../models/DeliveryPersonnel.js");
const User = require("../models/User.js");

// get all delivery personnel
const getDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.find();
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a single delivery personnel by ID
const getDeliveryPersonnelById = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findOne({userID: req.params.id});

    if (!deliveryPersonnel)
      return res.status(404).json({ message: "Delivery personnel not found" });

    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new delivery personnel
const createDeliveryPersonnel = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
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

    const newDeliveryPersonnel = new DeliveryPersonnel({
      userID: newUser._id,
      name: newUser.name,
      phone,
    });

    const savedDeliveryPersonnel = await newDeliveryPersonnel.save();
    res.status(201).json(savedDeliveryPersonnel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update a delivery personnel by ID

const updateDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!deliveryPersonnel)
      return res.status(404).json({ message: "Delivery personnel not found" });

    // update user name in User model if provided in request body
    if (req.body.name) {
      await User.findByIdAndUpdate(deliveryPersonnel.userID, { name: req.body.name });
    }

    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a delivery personnel by ID

const deleteDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findByIdAndDelete(
      req.params.id
    );

    if (!deliveryPersonnel)
      return res.status(404).json({ message: "Delivery personnel not found" });

    await User.findByIdAndDelete(deliveryPersonnel.userID);

    res
      .status(200)
      .json({ message: "Delivery personnel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDeliveryPersonnel,
  getDeliveryPersonnelById,
  createDeliveryPersonnel,
  updateDeliveryPersonnel,
  deleteDeliveryPersonnel,
};

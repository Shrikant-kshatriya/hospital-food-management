const Order = require("../models/Order.js");
const OrderBox = require("../models/OrderBox.js");
const Patient = require("../models/Patient.js");

// to get all orders from the database

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(req.query).populate("foodchart").populate("patientID");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// to get a single order from the database

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("foodchart").populate("preparationBy").populate("patientID");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// to create a new order in the database

const createOrder = async (req, res) => {
  try {
    const { patientID, preparationBy } = req.body;

    const patient = await Patient.findById(patientID);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const newOrder = new Order({
      patientID,
      foodchart: patient.foodchart,
      preparationBy
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// to update an existing order in the database

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    ['morning', 'evening', 'night'].forEach(async (mealType) => {
      if (order.preparation[mealType] === 'Completed') {
        try {
          await OrderBox.findOneAndUpdate(
            { 'preparation.by': order.preparationBy, mealTime: mealType },
            { preparation: { by: order.preparationBy, status: 'completed' } }
          );
        } catch (error) {
          console.error(`Error updating OrderBox for mealType ${mealType}:`, error);
        }
      }
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// to delete an existing order from the database

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

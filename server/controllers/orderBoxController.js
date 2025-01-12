const Order = require("../models/Order.js");
const OrderBox = require("../models/OrderBox.js");

// Fetch all ordersBox

const getAllOrdersBox = async (req, res) => {
  try {
    if (req.query.preparationBy) {
      const orderBox = await OrderBox.find({
        "preparation.by": req.query.preparationBy,
      })
        .populate("patientID", "name")
        .populate("deliveryBy", "name")
        .populate("preparation.by", "name");
      res.status(200).json(orderBox);
    } else {
      const ordersBox = await OrderBox.find(req.query)
        .populate("patientID", "name")
        .populate("deliveryBy", "name")
        .populate("preparation.by", "name");
      res.status(200).json(ordersBox);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch orderBox by ID

const getOrderBoxById = async (req, res) => {
  try {
    const orderBox = await OrderBox.findById(req.params.id);
    if (!orderBox)
      return res.status(404).json({ error: "Order box not found" });
    res.status(200).json(orderBox);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new orderBox

const createOrderBox = async (req, res) => {
  try {
    const newOrderBox = new OrderBox(req.body);
    const savedOrderBox = await newOrderBox.save();
    res.status(201).json(savedOrderBox);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing orderBox

const updateOrderBox = async (req, res) => {
  try {
    if (req.body.status === "delivered") {
      try {
        const orderBox = await OrderBox.findById(req.params.id);
        await Order.findOneAndUpdate(
          {
            preparationBy: orderBox.preparation.by,
            [`preparation.${orderBox.mealTime}`]: "Completed",
          },
          {
            delivery: { [orderBox.mealTime]: true },
          }
        );
        const updatedOrderBox = await OrderBox.findByIdAndUpdate(
          req.params.id,
          {...req.body, deliveryTime: Date.now()},
          { new: true, runValidators: true }
        );
        if (!updatedOrderBox)
          return res.status(404).json({ error: "Order box not found" });
        res.status(200).json(updatedOrderBox);
      } catch (err) {
        return res.status(500).json({ error: "Error updating order" });
      }
    } else {
      const updatedOrderBox = await OrderBox.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedOrderBox)
        return res.status(404).json({ error: "Order box not found" });
      res.status(200).json(updatedOrderBox);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete an existing orderBox

const deleteOrderBox = async (req, res) => {
  try {
    const deletedOrderBox = await OrderBox.findByIdAndDelete(req.params.id);
    if (!deletedOrderBox)
      return res.status(404).json({ error: "Order box not found" });
    res.status(200).json(deletedOrderBox);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllOrdersBox,
  getOrderBoxById,
  createOrderBox,
  updateOrderBox,
  deleteOrderBox,
};

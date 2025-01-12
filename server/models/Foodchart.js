// patients food chart
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  instructions: [{ type: String }],
  ingredients: [{ type: String }],
  nutritionalValue: { type: Number },
  servingSize: {
    type: String,
    enum: ["large", "medium", "small"],
    default: "medium",
  },
});

const foodchartSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  morning: mealSchema,
  evening: mealSchema,
  night: mealSchema,
});

const Foodchart = mongoose.model("Foodchart", foodchartSchema);

module.exports = Foodchart;

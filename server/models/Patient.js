// patient information model
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  diseases: [{ type: String }],
  allergies: [{ type: String }],
  //   food chart
  foodchart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Foodchart",
  },
  floor: { type: String, required: true },
  room: { type: Number, required: true },
  bed: { type: Number, required: true },
  discharged: { type: Boolean, default: false}
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

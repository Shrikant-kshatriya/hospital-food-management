const Foodchart = require("../models/Foodchart.js");
const Patient = require("../models/Patient.js");

// create foodchart for Patient

const createFoodchart = async (req, res) => {
  try {
    const { patientID, morning, evening, night } = req.body;
    const patient = await Patient.findById(patientID);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const foodchart = new Foodchart({
      patientID: patientID,
      morning: morning,
      evening: evening,
      night: night,
    });

    patient.foodchart = foodchart._id;
    await patient.save();
    await foodchart.save();

    res
      .status(201)
      .json({ message: "Foodchart created successfully", foodchart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update foodchart for Patient

const updateFoodchart = async (req, res) => {
  try {
    const { id } = req.params;

    const foodchart = await Foodchart.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!foodchart)
      return res.status(404).json({ message: "Foodchart not found" });

    res.json({ message: "Foodchart updated successfully", foodchart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFoodchart,
  updateFoodchart,
};

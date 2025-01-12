const Patient = require("../models/Patient.js");

// create a new Patient

const createPatient = async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      emergencyContact,
      age,
      gender,
      diseases,
      allergies,
      floor,
      room,
      bed,
    } = req.body;

    const newPatient = new Patient({
      name,
      address,
      phone,
      emergencyContact,
      age,
      gender,
      diseases,
      allergies,
      floor,
      room,
      bed,
    });

    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// find all patients

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('foodchart');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// find a patient by ID

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('foodchart');
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a patient by ID

const updatePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a patient by ID

const deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};

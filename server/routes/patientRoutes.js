const express = require('express');
const { getAllPatients, getPatientById, createPatient, updatePatientById, deletePatientById } = require('../controllers/patientController');
const { createFoodchart, updateFoodchart } = require('../controllers/foodchartController');
const router = express.Router();

router.get('/', getAllPatients);

router.get('/:id', getPatientById);

router.post('/', createPatient);

router.patch('/:id', updatePatientById);

router.delete('/:id', deletePatientById);

// food chart create, update
router.post('/foodChart', createFoodchart);

router.patch('/foodChart/:id', updateFoodchart);

module.exports = router;
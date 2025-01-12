const express = require('express');
const { getPantryStaff, getPantryStaffById, createPantryStaff, updatePantryStaff, deletePantryStaff } = require('../controllers/pantryController');
const router = express.Router();

router.get('/', getPantryStaff);

router.get('/:id', getPantryStaffById);

router.post('/', createPantryStaff);

router.patch('/:id', updatePantryStaff);

router.delete('/:id', deletePantryStaff);

module.exports = router;
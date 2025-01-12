const express = require('express');
const { getDeliveryPersonnel, getDeliveryPersonnelById, createDeliveryPersonnel, updateDeliveryPersonnel, deleteDeliveryPersonnel } = require('../controllers/deliveryPersonnelController');
const router = express.Router();

router.get('/', getDeliveryPersonnel);

router.get('/:id', getDeliveryPersonnelById);

router.post('/', createDeliveryPersonnel);

router.patch('/:id', updateDeliveryPersonnel);

router.delete('/:id', deleteDeliveryPersonnel);

module.exports = router;
const express = require('express');
const { getAllOrdersBox, getOrderBoxById, createOrderBox, updateOrderBox, deleteOrderBox } = require('../controllers/orderBoxController');
const router = express.Router();

router.get('/', getAllOrdersBox);

router.get('/:id', getOrderBoxById); 

router.post('/', createOrderBox);

router.patch('/:id', updateOrderBox);

router.delete('/:id', deleteOrderBox);

module.exports = router;
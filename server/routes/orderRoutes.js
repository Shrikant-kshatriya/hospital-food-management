const express = require('express');
const { deleteOrder, updateOrder, getOrderById, getAllOrders, createOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder);

router.get('/', getAllOrders);

router.get('/:id', getOrderById);

router.patch('/:id', updateOrder);

router.delete('/:id', deleteOrder);

module.exports = router;
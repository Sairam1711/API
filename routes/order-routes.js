const express = require('express');
const { createOrder, getOrdersByUser, updateOrderStatus } = require('../controllers/order-controller');
const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.put('/:id', updateOrderStatus);

module.exports = router;

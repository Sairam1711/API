const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Product = require('../models/products');
const Order = require('../models/order');

// Dashboard
// router.get('/', (req, res) => {
//   res.render('dashboard', { page: 'Dashboard' });
// });

// Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.render('layout', { page: 'Users', content:"Users", users });
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.render('layout', { page: 'Products',content:"Products", products });
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

// Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    res.render('layout', { page: 'Orders' ,content:"Orders", orders });
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});

module.exports = router;
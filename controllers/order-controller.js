const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/products');

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty. Please add products to your cart.' });
    }

    // Calculate the total price
    let totalPrice = 0;
    const orderProducts = [];

    for (const cartProduct of cart.products) {
      const product = await Product.findById(cartProduct.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with id ${cartProduct.productId} not found.` });
      }

      totalPrice += product.price * cartProduct.quantity;

      orderProducts.push({
        productId: cartProduct.productId,
        quantity: cartProduct.quantity,
        price: product.price,
      });
    }

    // Create the order
    const order = new Order({
      userId,
      products: orderProducts,
      totalPrice,
      status: 'pending', // Default status
    });

    await order.save();

    // Clear the cart after creating the order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products._id');
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'shipped', 'completed', 'cancelled'];

    // Validate the status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Allowed values are: pending, shipped, completed, cancelled.' });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

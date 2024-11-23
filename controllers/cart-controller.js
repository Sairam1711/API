const Cart = require('../models/cart');
const Product = require('../models/products');

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);

    if (existingProductIndex > -1) {
      // If the product is already in the cart, update the quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.products.push({ productId, quantity });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get the current cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    
    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from the cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

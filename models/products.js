const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  topSeller: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  images: [String],
  sku: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Products', productSchema);

module.exports = Product;

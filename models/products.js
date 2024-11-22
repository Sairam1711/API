const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  topSeller: { type: Boolean, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;

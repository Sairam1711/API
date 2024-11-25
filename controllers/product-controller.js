const Product = require('../models/products');
const DButils=require('../utils/DButils')
// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, brand, price, stock, sku ,topSeller} = req.body;
    const images = req.files.map(file => file.filename);
    // Check if product exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) return res.status(400).json({ message: 'Product already exists' });

    const newProduct = new Product({
      name,
      description,
      category,
      brand,
      price,
      stock,
      images,
      sku,
      topSeller
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.insertManyProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(await req.body);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, category, brand, price, stock, images, sku } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, brand, price, stock, images, sku },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search Products
exports.searchProducts = async (req, res) => {


  
  try {
  
    const { category, brand, price_min, price_max ,pageNumber,limit} = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (price_min && price_max) filter.price = { $gte: price_min, $lte: price_max };
    DButils.findWithSkipAndLimit(
      req,
      res,
      Product,
      filter,
      pageNumber,
      limit
    );
    // const products = await Product.find(filter);
    // res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

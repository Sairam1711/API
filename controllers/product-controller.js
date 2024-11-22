// Sample in-memory product data

;
const Product = require('../models/products');  // Assuming you have a Product model
const DButils = require('../utils/DButils');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { category, brand, name, image, topSeller, price } = req.body;

    // Validate the required fields
    if (!category || !brand || !name || !image || !topSeller || !price) {
      return res.status(400).json({ message: "All  fields are required." });
    }

    // Create a new product
    const newProduct = new Product({
      category,
      brand,
      name,
      image,
      topSeller,
      price
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error." });
  }
};
exports.createmany=async(req, res) => {
 
  try {
    // Extract array of products from request body
    const products = req.body;

    // Use insertMany to save multiple documents
    const insertedProducts = await Product.insertMany(products);

    // Send success response
    res.status(201).json({
      message: 'Products inserted successfully',
      data: insertedProducts,
    });
  } catch (error) {
    // Send error response
    res.status(500).json({
      message: 'Error inserting products',
      error: error.message,
    });
  }
}
// Get all products
exports.getAllProducts = async (req, res) => {
  
  try {

    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error." });
  }
};
exports.getProductswithpage = async (req, res) => {
  const body= await req.body
 const pageNumber=body.pageNumber
 try {
   DButils.findWithSkipAndLimit(
     req,
     res,
     Product,
     {},
     pageNumber,
     req.body.limit
   );
   // const products = await Product.find();
   // res.status(200).json(products);
 } catch (error) {
   console.error("Error fetching products:", error);
   res.status(500).json({ message: "Server error." });
 }
};
// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  try {
    const { category, brand, name, image, topSeller, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        category,
        brand,
        name,
        image,
        topSeller,
        price
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

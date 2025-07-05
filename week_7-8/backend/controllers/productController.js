const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  console.log("products route hit");

  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ message: err.message });
  }
};

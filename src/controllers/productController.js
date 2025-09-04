import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      stock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { createProduct, getProducts };

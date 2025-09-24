import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

// Fetch all products
// GET /api/products
router.get("/", getProducts);

// Create a new product
// POST /api/products
router.post("/", createProduct);

//export
export default router;

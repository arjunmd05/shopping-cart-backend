import express from "express";
const router = express.Router();
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

// All routes are protected
router.route("/").get(protect, getCart).post(protect, addItemToCart);

router.route("/:productId").delete(protect, removeItemFromCart);

//export
export default router;

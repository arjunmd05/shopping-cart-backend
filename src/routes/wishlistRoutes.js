import express from "express";
const router = express.Router();
import {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

// All routes are protected
router.route("/").get(protect, getWishlist).post(protect, addProductToWishlist);
router.route("/:productId").delete(protect, removeProductFromWishlist);

//export
export default router;

import express from "express";
const router = express.Router();
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

// All routes here are protected
router.route("/").post(protect, addAddress).get(protect, getAddresses);
router.route("/:id").put(protect, updateAddress).delete(protect, deleteAddress);

export default router;

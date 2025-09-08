import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

// // When someone sends a POST request to /register, run registerUser
router.post("/register", registerUser);
router.post("/login", loginUser);

// Applying the 'protect' middleware to our routes.
// The middleware will run before the controller function.
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

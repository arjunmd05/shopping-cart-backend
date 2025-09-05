import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/userController.js";

// // When someone sends a POST request to /register, run registerUser
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

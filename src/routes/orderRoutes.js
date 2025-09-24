import express from "express";
const router = express.Router();
import { createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createOrder);

//export
export default router;

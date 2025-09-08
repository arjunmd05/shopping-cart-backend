import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// Configure environment variables
// This line loads the variables from my .env file
dotenv.config();

//Connect to the database
connectDB();

// Create an instance of the Express app
const app = express();

// Middleware to accept JSON data
app.use(express.json());

// Define the port
// Use the PORT from .env, or default to 5001 if it's not defined
const PORT = process.env.PORT || 5001;

// Create a basic test route
app.get("/", (req, res) => {
  res.send("<h1>Shopping App API is running...</h1>");
});

// Use the product routes
app.use("/api/products", productRoutes);

// Use the user routes
app.use("/api/users", userRoutes);

// Use the address routes
app.use("/api/addresses", addressRoutes);

// Use the wishlist routes
app.use("/api/wishlist", wishlistRoutes);

// Use the cart routes
app.use("/api/cart", cartRoutes);

// Use the order routes
app.use("/api/orders", orderRoutes);

// ERROR HANDLING

// 1. Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// 2. Global error handler middleware
const errorHandler = (err, req, res, next) => {
  // Checking if the status code is still 200 if so, making it 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Include stack trace only in development mode for debugging
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Use the error handlers
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

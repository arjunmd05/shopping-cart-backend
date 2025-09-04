import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

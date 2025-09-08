import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Register a new user
// POST /api/users/register
// Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create the new user in the database
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // If user was created successfully, send back user data
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Auth user & get token
// POST /api/users/login
// Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if passwords match
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = async (req, res) => {
  // We have access to req.user because the 'protect' middleware ran first
  const user = req.user;

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    // If the user is updating their password, we have to re-hash it
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };

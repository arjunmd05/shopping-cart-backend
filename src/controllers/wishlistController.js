import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";

// Get user's wishlist
// GET /api/wishlist
// Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "products"
    );
    if (!wishlist) {
      return res.status(200).json({ products: [] }); // No wishlist, return empty
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add product to wishlist
// POST /api/wishlist
// Private
const addProductToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    // If no wishlist, create one
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Check if product is already in the wishlist
    const alreadyAdded = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove product from wishlist
// DELETE /api/wishlist/:productId
// Private
const removeProductFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Remove the product from the array
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//export
export { getWishlist, addProductToWishlist, removeProductFromWishlist };

import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Get user's cart
// GET /api/cart
// Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product" // Nested populate
    );
    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add or update item in cart
// POST /api/cart
// Private
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user's cart, or create a new one
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If product exists in cart, update quantity
      cart.items[itemIndex].quantity = quantity;
    } else {
      // If product does not exist, add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    // Populate before sending back to client
    const populatedCart = await cart.populate("items.product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove item from cart
// DELETE /api/cart/:productId
// Private
const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//export
export { getCart, addItemToCart, removeItemFromCart };

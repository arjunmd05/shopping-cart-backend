import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Address from "../models/addressModel.js";

// Create a new order
// POST /api/orders
// Private
const createOrder = async (req, res) => {
  try {
    const { addressId } = req.body;
    const userId = req.user._id;

    // 1. Get the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // 2. Get the shipping address
    const shippingAddress = await Address.findById(addressId);
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    // 3. Prepare orderItems and calculate total price
    const orderItems = cart.items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      product: item.product._id,
    }));

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    // 4. Create the new order
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
        phone: shippingAddress.phone,
      },
      totalPrice,
    });

    const createdOrder = await order.save();

    // 5. Clear the user's cart
    await Cart.deleteOne({ user: userId });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { createOrder };

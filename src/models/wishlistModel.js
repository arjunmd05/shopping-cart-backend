import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true, // Each user can only have one wishlist
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product", // An array of references to products
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

//export
export default Wishlist;

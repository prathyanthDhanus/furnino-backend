const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlist;

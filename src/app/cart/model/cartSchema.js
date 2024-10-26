const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      quantity : {
        type: Number,
        required: true,
        min: 1,
      },
      selectedCapacity : {
        type: String,
        required: true,

      },
      
  },

);

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;

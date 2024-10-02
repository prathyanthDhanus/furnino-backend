const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
  orderedAddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },

  isOrderDeleted: {
    type: Boolean,
    default: false,
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;

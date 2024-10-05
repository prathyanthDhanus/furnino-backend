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

  orderStatus: {
    type: String,
    enum: ["Ordered", "Shipped", "Out for delivery", "Order Completed"],
    default: "Ordered",
  },
});
  
const order = mongoose.model("order", orderSchema);
module.exports = order;

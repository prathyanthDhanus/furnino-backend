const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      selectedCapacity: {
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: ["Ordered", "Shipped", "Out for delivery", "Order Completed"],
    default: "Ordered",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingDetails: {
    name: String,
    houseName: String,
    street: String,
    landMark: String,
    city: String,
    district: String,
    state: String,
    pincode: String,
    addressType: String
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

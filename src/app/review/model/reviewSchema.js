const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  commentTitle: {
    type: String,
    trim: true,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Pre-save hook to set the updatedAt field before saving
reviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;

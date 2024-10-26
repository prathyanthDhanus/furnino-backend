const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  info: {
    type: String,
    required: true,
    trim: true,
  },
  additionalInfo: {
    type: String,
    trim: true,
  },
  colour: [{
    type: String,
    trim: true,
  }],
  seatingCapacity: [{
    type: String,
    trim: true,
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    min: 0,
  },
  discountPrice: {
    type: Number,
    min: 0,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted : {
    type:Boolean,
    default:false
  }
});

// Middleware to update the 'updatedAt' field
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const product = mongoose.model("product", productSchema);

module.exports = product;

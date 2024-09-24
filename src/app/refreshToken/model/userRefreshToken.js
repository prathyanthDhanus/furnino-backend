const mongoose = require("mongoose");

const userRefreshToken = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

const userRefreshTokenModel = mongoose.model("userRefreshToken", userRefreshToken);
module.exports = userRefreshTokenModel;
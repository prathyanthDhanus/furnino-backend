const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    otp: {
      type: String,
      unique: true,
    },
    expireAt: {
      type: Date,
      expires: 300,
    },
  },
  { timestamps: true }
);

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;

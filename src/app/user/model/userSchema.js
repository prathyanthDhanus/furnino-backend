const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  address: [
    {
      name: {
        type: String,
      },
      houseName: {
        type: String,
      },
      street: {
        type: String,
      },
      landMark: {
        type: String,
      },
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
      },
      addressType: {
        type: String,
      },
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;

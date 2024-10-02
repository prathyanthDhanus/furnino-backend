
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
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
}, { _id: true });  // This ensures each address gets an _id field

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
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
  address: [addressSchema], 
});

const user = mongoose.model("user", userSchema);
module.exports = user;

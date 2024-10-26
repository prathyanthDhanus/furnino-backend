const express = require("express");
const router = express.Router();
const{tokenVerifyUser} = require("../../utils/jwtToken");
const tryCatch = require("../../utils/tryCatch");
const wishist = require("./controller")

router 
  .post("/user",tokenVerifyUser,tryCatch(wishist.addToWishlist))
  .get("/user",tokenVerifyUser,tryCatch(wishist.getAllWishlistOfaUser))
  .delete("/user/:wishlistId",tokenVerifyUser,tryCatch(wishist.deleteFromWishlist))


  module.exports= router;
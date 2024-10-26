const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const cart = require("../cart/controller");
const {tokenVerifyUser,tokenVerifyAdmin} = require("../../utils/jwtToken");

router
.post("/user",tokenVerifyUser,tryCatch(cart.addToCart))

.get("/user",tokenVerifyUser,tryCatch(cart.getAllProductsFromCart))
.get("/user/cart-total",tokenVerifyUser,tryCatch(cart.cartTotalOfAUser))
.get("/user/selected/cart-total",tokenVerifyUser,tryCatch(cart.cartTotalOfSelectedProducts))
     
.put("/user",tokenVerifyUser,tryCatch(cart.updateQuantiyOfTheProduct))

.delete("/user/:cartId",tokenVerifyUser,tryCatch(cart.deleteProductFromCart))


module.exports=router;


const express = require('express');
const router = express.Router();
const tryCatch = require('../../utils/tryCatch');  
const {tokenVerifyUser} = require("../../utils/jwtToken"); 
const order = require("../order/controller");



router
 

 .post("/order/:orderedAddressId",tokenVerifyUser,tryCatch(order.addOrder))
 .get("/my-orders",tokenVerifyUser,tryCatch(order.getallOrdersfAUser))
 








 module.exports = router;
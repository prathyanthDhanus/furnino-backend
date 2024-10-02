const express = require('express');
const router = express.Router();
const tryCatch = require('../../utils/tryCatch');  
const {tokenVerifyUser} = require("../../utils/jwtToken"); 
const order = require("../order/controller");


router
 

 .post("/order/:orderedAddressId",tokenVerifyUser,tryCatch(order.addOrder))










 module.exports = router;
const express = require("express");
const tryCatch = require("../../utils/tryCatch");
const router = express.Router();
const subCategory = require("../subCategory/controller");
const {tokenVerifyAdmin} = require("../../utils/jwtToken");


router 
.post("/" ,tryCatch(subCategory.addSubCategory))


module.exports = router;
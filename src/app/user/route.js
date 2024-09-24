const express = require('express');
const router = express.Router();
const tryCatch = require('../../utils/tryCatch');  
const {tokenVerifyUser} = require("../../utils/jwtToken"); 
const user = require("../user/controller");


router
 .post("/register",tryCatch(user.userRegister))
 .post("/login",tryCatch(user.userDefaultLogin))
 .post("/google/login",tryCatch(user.loginWithGoogle))
 .post("/otp/login",user.loginWithSendOtp)
 .post("/verify/otp/login",user.loginWithVerifyOtp)








 module.exports = router;
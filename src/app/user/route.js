const express = require('express');
const router = express.Router();
const tryCatch = require('../../utils/tryCatch');  
const {tokenVerifyUser} = require("../../utils/jwtToken"); 
const user = require("../user/controller");


router
 .get("/profile",tokenVerifyUser,tryCatch(user.fetchUserProfile))

 .post("/register",tryCatch(user.userRegister))
 .post("/login",tryCatch(user.userDefaultLogin))
 .post("/google/login",tryCatch(user.loginWithGoogle))
 .post("/otp/login",tryCatch(user.loginWithSendOtp))
 .post("/verify/otp/login",tryCatch(user.loginWithVerifyOtp))
 .post("/address",tokenVerifyUser,tryCatch(user.userProfile))
 .post("/payment",tokenVerifyUser,tryCatch(user.userPayment))

 .put("/address/:addressId",tokenVerifyUser,tryCatch(user.updateProfile))

 .delete("/address/:addressId",tokenVerifyUser,tryCatch(user.profileDelete))








 module.exports = router;
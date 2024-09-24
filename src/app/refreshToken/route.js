const express =require("express");
const router = express.Router();
const controller = require("../refreshToken/controller");

router
.post("/refresh-token",controller.userRefreshToken);









module.exports = router;
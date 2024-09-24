const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

const userRoute = require("./src/app/user/route")
app.use("/api/user",userRoute);

const refreshTokenRoute = require("./src/app/refreshToken/route")
app.use("/api/auth",refreshTokenRoute);

module.exports = app;

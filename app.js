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

const category = require("./src/app/category/route")
app.use("/api/category",category);

const subCategory = require("./src/app/subCategory/route")
app.use("/api/sub-category",subCategory);



module.exports = app;

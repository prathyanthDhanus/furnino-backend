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

const review = require("./src/app/review/route")
app.use("/api/review",review);

const product = require("./src/app/product/route")
app.use("/api/product",product);

const order = require("./src/app/order/route")
app.use("/api/user",order);

const cart = require("./src/app/cart/route")
app.use("/api/cart",cart);

const wishist = require("./src/app/wishlist/route")
app.use("/api/wishlist",wishist);


module.exports = app;

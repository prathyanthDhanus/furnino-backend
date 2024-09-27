const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const category = require("../category/controller");
const {tokenVerifyAdmin} = require("../../utils/jwtToken");
const upload = require("../../utils/multer");


router
  .post("/",upload.single("image"),tryCatch(category.addCategory))
  .get("/categories",tryCatch(category.getAllCategory))
  .put("/category",upload.single("image"),tryCatch(category.updateCategory))
  .delete("/category",tryCatch(category.deleteCategory))

module.exports = router;

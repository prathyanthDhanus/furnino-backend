const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const productController = require("../product/controller");
const { uploadMultiple } = require("../../utils/multerArrayimages"); 


router
.post("/admin", uploadMultiple("products"), tryCatch(productController.addProduct))

.get("/admin",tryCatch(productController.getAllProductsByCategory))
.get("/user",tryCatch(productController.getAllProductsByCategory))
.get("/admin/:productId", tryCatch(productController.getProductById))
.get("/user/:productId", tryCatch(productController.getProductById))

.put("/admin", uploadMultiple("products"), tryCatch(productController.updateProduct))

.delete("/admin",tryCatch(productController.deleteProduct))


module.exports = router;

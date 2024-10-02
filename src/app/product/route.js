const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const productController = require("../product/controller");
const { uploadMultiple } = require("../../utils/multerArrayimages"); 


router
.post("/admin", uploadMultiple("products"), tryCatch(productController.addProduct))

.get("/admin",tryCatch(productController.getAllProducts))
.get("/user",tryCatch(productController.getAllProducts))
.get("/admin", tryCatch(productController.getProductByIdDb))
.get("/user", tryCatch(productController.getProductByIdDb))

.put("/admin", uploadMultiple("products"), tryCatch(productController.updateProduct))

.delete("/admin",tryCatch(productController.deleteProduct))


module.exports = router;

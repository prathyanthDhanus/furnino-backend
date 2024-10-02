const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const category = require("../category/controller");
const { tokenVerifyAdmin } = require("../../utils/jwtToken");
const upload = require("../../utils/multer");

router
  .post("/admin", upload.single("image"), tryCatch(category.addCategory))

  .get("/admin/categories", tryCatch(category.getAllCategory))
  .get("/user/categories", tryCatch(category.getAllCategory))

  .put("/admin", upload.single("image"), tryCatch(category.updateCategory))

  .delete("/admin", tryCatch(category.deleteCategory));

module.exports = router;

const express = require("express");
const tryCatch = require("../../utils/tryCatch");
const router = express.Router();
const subCategory = require("../subCategory/controller");
const { tokenVerifyAdmin } = require("../../utils/jwtToken");
const upload = require("../../utils/multer");

router
  .post("/admin", tryCatch(subCategory.addSubCategory))

  .get("/admin/sub-categories", tryCatch(subCategory.getAllSubCategory))
  .get("/user/sub-categories", tryCatch(subCategory.getAllSubCategory))

  .put("/admin", tryCatch(subCategory.updateSubCategory))
  .delete("/admin", tryCatch(subCategory.deleteSubCategory));

module.exports = router;

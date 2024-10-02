const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const review = require("../review/controller");
const { tokenVerifyAdmin } = require("../../utils/jwtToken");
const {uploadMultiple} = require("../../utils/multerArrayimages");

router
 .post("/user",uploadMultiple("review"),tryCatch(review.addReview))

 .get("/user",tryCatch(review.getReviewsOfaProduct))
 .get("/admin",tryCatch(review.getReviewsOfaProduct))
 .get("/user",tryCatch(review.getReviewsOfaUser))
 .get("/admin",tryCatch(review.getReviewsOfaUser))

 .put("/user",uploadMultiple("review"),tryCatch(review.updateReview))

 .delete("/user",tryCatch(review.deleteReview))

 



 module.exports = router;
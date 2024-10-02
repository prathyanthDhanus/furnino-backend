const {
  addReviewDb,
  getReviewsOfaProductDb,
  getReviewsOfaUserDb,
  updateReviewDb,
  deleteReviewDb
} = require("./services/db");

module.exports = {
  addReview: async (req, res) => {
    const { userId } = req.user;
    const { rating, commentTitle, comment, productId } = req.body;

    // Extract the image URLs from the files
    const imageUrls = req.files.map((file) => file.path); // Extract URLs from uploaded images

    const saveReview = await addReviewDb(
      userId,
      rating,
      commentTitle,
      comment,
      productId,
      imageUrls
    );

    return res.status(200).json({
      status: "success",
      message: "Review posted successfully",
      data: saveReview,
    });
  },

  getReviewsOfaProduct: async (req, res) => {
    const productId = req.query;
    const findProduct = await getReviewsOfaProductDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Review fetched successfully",
      data: findProduct,
    });
  },

  getReviewsOfaUser: async (req, res) => {
    const userId = req.user;
    const findReviewsOfaUser = await getReviewsOfaUserDb(userId);
    return res.status(200).json({
      status: "success",
      message: "Review fetched successfully",
      data: findProduct,
    });
  },

  updateReview: async (req, res) => {
    const reviewId = req.query;
    const { rating, commentTitle, comment, productId } = req.body;
    const findAndUpdateReview = await updateReviewDb(
      rating,
      commentTitle,
      comment,
      productId,
      reviewId
    );
    return res.status(200).json({
      status: "success",
      message: "Review updated successfully",
      data: findAndUpdateReview,
    });
  },

  deleteReview: async (req, res) => {
    const reviewId = req.query;
    const findAndDeleteReview = await deleteReviewDb(reviewId);
    return res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
      data: findAndDeleteReview,
    });
  },
};

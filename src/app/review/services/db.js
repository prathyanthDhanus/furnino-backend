const reviewModel = require("../model/reviewSchema");
const AppError = require("../../../utils/appError");

module.exports = {
  //===================== add review =======================
  addReviewDb: async (
    userId,
    rating,
    commentTitle,
    comment,
    productId,
    imageUrls
  ) => {
    const saveReview = new reviewModel({
      userId: userId,
      rating: rating,
      comment: comment,
      commentTitle: commentTitle,
      productId: productId,
      imageUrls: imageUrls, // Store the array of image URLs
    });

    await saveReview.save();

    if (!saveReview) {
      throw new AppError(
        "Review not posted. Something went wrong",
        "Field validation error: Review not posted. Something went wrong",
        403
      );
    }
    return saveReview;
  },

  //===================== get reviews of a product =======================

  getReviewsOfaProductDb: async (productId) => {
    const findProduct = await reviewModel.findById(productId);
    if (!findProduct) {
      throw new AppError(
        "No review found",
        "Field validation error: NO review found",
        404
      );
    }
    return findProduct;
  },
  getReviewsOfaUserDb: async (userId) => {
    const findProduct = await reviewModel.findById(userId);
    if (!findProduct) {
      throw new AppError(
        "No review found",
        "Field validation error: NO review found",
        404
      );
    }
    return findProduct;
  },

  updateReviewDb: async (
    rating,
    commentTitle,
    comment,
    productId,
    reviewId
  ) => {
    const findReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      {
        rating: rating,
        comment: comment,
        commentTitle: commentTitle,
        productId: productId,
      },
      { new: true }
    );
    if (!findReview) {
      throw new AppError(
        "No review found",
        "Field validation error: NO review found",
        404
      );
    }
    return findReview;
  },

  deleteReviewDb: async (reviewId) => {
    const findReviewAndDelete = await reviewModel.findByIdAndDelete(reviewId);

    if (findReviewAndDelete) {
      throw new AppError(
        "No review found",
        "Field validation error: NO review found",
        404
      );
    }

    return findReviewAndDelete;
  },
};

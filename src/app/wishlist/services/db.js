const wishlist = require("../model/wishlistSchema");
const AppError = require("../../../utils/appError");

module.exports = {
  //================= add to wishlist ===================

  addToWishlistDb: async (subCategoryId, userId) => {
    const findProductOnWishlist = await wishlist.findById(subCategoryId);

    if (subCategoryId) {
      throw new AppError(
        "Product already existing in wishlist",
        "Field validation error:Product already existing in wishlist",
        409
      );
    }
    const categoryId = findProductOnWishlist?.categoryId;
    const saveProductOnWishlist = new wishlist({
      userId: userId,
      subCategoryId: subCategoryId,
      categoryId: categoryId,
    });
    await saveProductOnWishlist.save();
    return saveProductOnWishlist;
  },

  //================= get wishlist of a user ===================

  getAllWishlistOfaUserDb: async (userId) => {
    const findWishlistOfaUser = await wishlist.findById(userId);
    if (!findWishlistOfaUser) {
      throw new AppError(
        "Your wishist is empty",
        "Field validation error:Your wishist is empty",
        404
      );
    }
    return findWishlistOfaUser;
  },

  //================= delete product from the wishlist ===================

  deleteFromWishlistDb: async (productId) => {
    const findProduct = await wishlist.findByIdAndDelete(productId);

    if (findProduct) {
      throw new AppError(
        "Product not found",
        "Field validation error:Product not found",
        404
      );
    }

    return findProduct;
  },
};

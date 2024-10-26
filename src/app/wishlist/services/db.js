const wishlist = require("../model/wishlistSchema");
const AppError = require("../../../utils/appError");

module.exports = {
  //================= add to wishlist ===================

  addToWishlistDb: async (productId, userId) => {
    // Check if the product is already in the wishlist for this user
    const findProductOnWishlist = await wishlist.findOne({
      userId: userId,
      productId: productId
    });
  
    // If the product is found, throw an error
    if (findProductOnWishlist) {
      throw new AppError(
        "Product already exists in the wishlist",
        "Field validation error: Product already exists in the wishlist",
        409
      );
    }
  
    // If not found, proceed to add the product to the wishlist
    const saveProductOnWishlist = new wishlist({
      userId: userId,
      productId: productId,
    });
    await saveProductOnWishlist.save();
    return saveProductOnWishlist;
  },
  

  //================= get wishlist of a user ===================

  getAllWishlistOfaUserDb: async (userId) => {
    const findWishlistOfaUser = await wishlist.find({userId}).populate("productId");
    
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

  deleteFromWishlistDb: async (wishlistId) => {
    const findProduct = await wishlist.findByIdAndDelete(wishlistId);

    if (!findProduct) {
      throw new AppError(
        "Product not found",
        "Field validation error:Product not found",
        404
      );
    }

    return findProduct;
  },
};

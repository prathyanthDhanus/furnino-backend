const {
  addToWishlistDb,
  getAllWishlistOfaUserDb,
  deleteFromWishlistDb,
} = require("./services/db");

module.exports = {
  //================= add to wishlist ===================

  addToWishlist: async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId;
    const addToWishlist = await addToWishlistDb(productId, userId);
    return res.status(200).json({
      status: "success",
      message: "Product added to wishlist",
      data: addToWishlist,
    });
  },

  //================= get wishlist of a user ===================

  getAllWishlistOfaUser: async (req, res) => {
    const userId = req?.user?.userId;
    const findWishlist = await getAllWishlistOfaUserDb(userId);
    return res.status(200).json({
      status: "success",
      message: "User wishlist fetched successfully ",
      data: findWishlist,
    });
  },

  //================= delete product from the wishlist ===================

  deleteFromWishlist: async (req, res) => {
    const {wishlistId} = req.params;
    const deleteFromWishlist = await deleteFromWishlistDb(wishlistId);
    return res.status(200).json({
      status: "success",
      message: "Product removed from the wishlist",
      data: deleteFromWishlist,
    });
  },
};

const {
  addToWishlistDb,
  getAllWishlistOfaUserDb,
  deleteFromWishlistDb,
} = require("./services/db");

module.exports = {
  //================= add to wishlist ===================

  addToWishlist: async (req, res) => {
    const { subCategoryId } = req.body;
    const userId = req.user;
    const addToWishlist = await addToWishlistDb(subCategoryId, userId);
    return res.status(200).json({
      status: "success",
      message: "Product added to wishlist",
      data: addToWishlist,
    });
  },

  //================= get wishlist of a user ===================

  getAllWishlistOfaUser: async (req, res) => {
    const userId = req.user;
    const findWishlist = await getAllWishlistOfaUserDb(userId);
    return res.status(200).json({
      status: "success",
      message: "User wishlist fetched successfully ",
      data: findWishlist,
    });
  },

  //================= delete product from the wishlist ===================

  deleteFromWishlist: async (req, res) => {
    const productId = req.body;
    const deleteFromWishlist = await deleteFromWishlistDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Product removed from the wishlist",
      data: deleteFromWishlist,
    });
  },
};

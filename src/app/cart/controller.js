const {
  addToCartDb,
  getAllProductsFromCartDb,
  updateQuantiyOfTheProductDb,
  deleteProductFromCartDb,
  cartTotalOfAUserDb,
  cartTotalOfSelectedProductsDb,
} = require("./services/db");

module.exports = {
  //================= product add to cart ===================

  addToCart: async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity, selectedCapacity } = req.body;
    const saveProduct = await addToCartDb(
      productId,
      quantity,
      userId,
      selectedCapacity
    );

    return res.status(200).json({
      status: "success",
      message: "Product successfully added to cart",
      data: saveProduct,
    });
  },

  //================= get all cart products of a user ===================

  getAllProductsFromCart: async (req, res) => {
    const userId = req.user.userId;
    const fetchProducts = await getAllProductsFromCartDb(userId);
    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: fetchProducts,
    });
  },

  //================= update quantity of a product ===================

  updateQuantiyOfTheProduct: async (req, res) => {
    const userId = req.user.userId;
    const { quantity, productId } = req.body;
    const updateQuantity = await updateQuantiyOfTheProductDb(
      userId,
      quantity,
      productId
    );
    return res.status(200).json({
      status: "success",
      message: "Quantity updated successfully",
      data: updateQuantity,
    });
  },

  //================= delete a product from the cart ===================

  deleteProductFromCart: async (req, res) => {
  
    const { cartId } = req.params;
    const deleteProduct = await deleteProductFromCartDb(cartId);
    return res.status(200).json({
      status: "success",
      message: "Product successfully deleted from the cart",
      data: deleteProduct,
    });
  },

  //================= cart total of a user ===================

  cartTotalOfAUser: async (req, res) => {
    const userId = req.user.userId;
    const cartTotal = await cartTotalOfAUserDb(userId);
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched product total",
      data: cartTotal,
    });
  },

  //================= selected products cart total of a user ===================

  cartTotalOfSelectedProducts: async (req, res) => {
    const userId = req.user.userId;
    const { productIds } = req.body;
    if (!productIds || productIds.length === 0) {
      return res.status(400).json({
        status: "failure",
        message: "No products selected",
      });
    }

    const cartTotal = await cartTotalOfSelectedProductsDb(userId, productIds);
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched product total",
      data: cartTotal,
    });
  },
};

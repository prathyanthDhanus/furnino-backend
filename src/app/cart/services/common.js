const AppError = require("../../../utils/appError");

module.exports = {
  
  //================= cart total of a user ===================

  cartTotalOfAUserService: async (findAllCartPRoductsOfAUser) => {
    let total = 0;
    findAllCartPRoductsOfAUser.forEach((item) => {
      const productPrice = item.productId.discountPrice;
      const quantity = item.quantity;
      total += productPrice * quantity;
    });

    if (!total) {
      throw new AppError(
        "Something went wrong",
        "Field validation error:Something went wrong",
        500
      );
    }
    return total;
  },

  //================= selected products cart total of a user ===================

  cartTotalOfSelectedProductsService: async (selectedCartItems) => {
    const total = selectedCartItems.reduce((sum, item) => {
      const productPrice = item.productId.discountPrice;
      const quantity = item.quantity;
      return sum + productPrice * quantity;
    }, 0);
    return total;
  },
};

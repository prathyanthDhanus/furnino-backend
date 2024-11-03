const orderschema = require("../model/orderSchema");
const AppError = require("../../../utils/appError");

module.exports = {
  //====================== add order ========================

  addOrderDb: async (productId, orderedAddressId, quantity, userId, amount) => {
    const saveOrder = new orderschema({
      productId: productId,
      orderedAddress: orderedAddressId,
      quantity: quantity,
      userId: userId,
      amount: amount,
    });
    await saveOrder.save();
    if (!saveOrder) {
      throw new AppError(
        "Field validation error:Something went wrong",
        "Something went",
        500
      );
    }
    return saveOrder;
  },

  //====================== get all order of a user ========================

  getallOrdersfAUserDb: async (userId) => {
    const findOrders = await orderschema.find({ userId })
      .populate({
        path: "products.productId", // Access the productId field within products
      });

    if (!findOrders || findOrders.length === 0) {
      throw new AppError("Orders not found", "Field validation error: Orders not found", 404);
    }

    return findOrders;
  },

  //====================== get all order of a user ========================
  deleteproductFromOrderDb:async(productId)=>{

  }
};

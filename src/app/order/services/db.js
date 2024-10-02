const orderschema = require("../model/orderSchema");
const AppError = require("../../../utils/appError");

module.exports = {
  addOrderDb: async (productId, orderedAddressId, quantity, userId,amount) => {
    const saveOrder = new orderschema({
      productId: productId,
      orderedAddress: orderedAddressId,
      quantity: quantity,
      userId: userId,
      amount:amount
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
};

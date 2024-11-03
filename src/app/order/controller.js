const {
  addOrderDb,
  getallOrdersfAUserDb,
  deleteproductFromOrderDb,
} = require("./services/db");

module.exports = {
  //====================== add order ========================

  addOrder: async (req, res) => {
    const userId = req?.user?.userId;

    const { productId, quantity, amount, orderedAddressId, paymentType } =
      req.body;
    const saveOrder = await addOrderDb(
      productId,
      orderedAddressId,
      quantity,
      userId,
      amount,
      paymentType
    );
    return res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: saveOrder,
    });
  },

  //====================== get all order of a user ========================

  getallOrdersfAUser: async (req, res) => {
    const userId = req?.user?.userId;
    const findOrders = await getallOrdersfAUserDb(userId);
    return res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: findOrders,
    });
  },

  

  //====================== delete/cancel a product form the order    ========================

  deleteproductFromOrder: async (req, res) => {
    const { orderId, productId } = req.body;
    const findandRemoveOrder = await deleteproductFromOrderDb(
      orderId,
      productId
    );
    return res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: findandRemoveOrder,
    });
  },
};

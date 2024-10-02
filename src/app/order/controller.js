const { addOrderDb } = require("./services/db");

module.exports = {

  addOrder: async (req, res) => {
    const userId = req.user.userId;
    const {orderedAddressId} = req.params;

    const { productId, quantity,amount } = req.body;
    const saveOrder = await addOrderDb(
      productId,
      orderedAddressId,
      quantity,
      userId,
      amount
    );
    return res.status(200).json({
      status: "success",
      message: "Order created successfully",
      data: saveOrder,
    });
  },
  
};

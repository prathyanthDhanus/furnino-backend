const { addOrderDb ,getallOrdersfAUserDb,deleteproductFromOrderDb} = require("./services/db");

module.exports = {

   //====================== add order ========================

  addOrder: async (req, res) => {
    const userId = req?.user?.userId;

    const { productId, quantity,amount,orderedAddressId ,paymentType} = req.body;
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

getallOrdersfAUser:async(req,res)=>{
  const userId = req?.user?.userId;

  const findOrders = await getallOrdersfAUserDb(userId);
  return res.status(200).json({
    status: "success",
    message: "Order created successfully",
    data: findOrders,
  });
},

  //====================== get all order of a user ========================
  
deleteproductFromOrderDb:async(req,res)=>{

}

  
};

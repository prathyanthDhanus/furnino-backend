const cartModel = require("../model/cartSchema");
const AppError = require("../../../utils/appError");
const {cartTotalOfAUserService,cartTotalOfSelectedProductsService} = require("./common")

module.exports = {
   //================= product add to cart ===================

  addToCartDb: async (productId, quantity,userId,selectedCapacity) => {
    const existingProduct = await cartModel.findOne({
      productId: productId,
      userId:userId
    });

    if (existingProduct) {
      throw new AppError(
        "Product already exist",
        "Field validation error:Product already exist",
        409
      );
    }

    const saveProduct = new cartModel({
      productId: productId,
      quantity: quantity,
      userId:userId,
      selectedCapacity:selectedCapacity
    });
    await saveProduct.save();
    return saveProduct;
  },

  //================= get all cart products of a user ===================

  getAllProductsFromCartDb: async (userId) => {
    const fetchProducts = await cartModel.find({userId:userId}).populate("productId");
    if (fetchProducts.length === 0) {
      throw new AppError(
        "Your cart is empty",
        "Field validation error:Your cart is empty",
        404
      );
    }
    return fetchProducts;
  },

   //================= update quantity of a product ===================

  updateQuantiyOfTheProductDb: async (userId, quantity, productId) => {
    const existingProduct = await cartModel.findOneAndUpdate(
      { userId: userId, productId: productId },
      { $set: { quantity: quantity } },
    {new:true}
    );
    if (!existingProduct) {
      throw new AppError(
        "Your cart is empty",
        "Field validation error:Your cart is empty",
        404
      );
    }
    return existingProduct;
  },

   //================= delete a product from the cart ===================

  deleteProductFromCartDb: async (cartId) => {
    const deleteProduct = await cartModel.findByIdAndDelete(cartId);
    if (!deleteProduct) {
      throw new AppError(
        "Product not found",
        "Field validation error:Product not found",
        404
      );
    }
    return deleteProduct;
  },

   //================= cart total of a user ===================

  cartTotalOfAUserDb: async (userId) => {
    const findAllCartPRoductsOfAUser = await cartModel
      .find({ userId })
      .populate("productId", "discountPrice");
     
    if (!findAllCartPRoductsOfAUser) {
      throw new AppError(
        "Product not found , No products found in the cart",
        "Field validation error:Product not found",
        404
      );
    }

    const findCartTotal = await cartTotalOfAUserService(findAllCartPRoductsOfAUser);
    return findCartTotal;
  },

     //================= selected products cart total of a user ===================

  cartTotalOfSelectedProductsDb:async(userId,productIds)=>{
    const selectedCartItems = await cartModel
    .find({ userId, productId: { $in: productIds } })
    .populate("productId", "discountPrice"); 
    if (!selectedCartItems || selectedCartItems.length === 0) {
      throw new AppError(
        "Product not found , No products found in the cart",
        "Field validation error:Product not found",
        404
      );

    }
   const findCartTotal = await cartTotalOfSelectedProductsService(selectedCartItems);
   return findCartTotal;
  }
};

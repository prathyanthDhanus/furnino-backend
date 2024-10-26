const productModel = require("../model/productSchema");
const AppError = require("../../../utils/appError");
const { addProductService } = require("./common");

module.exports = {
  addProductDb: async (
    name,
    description,
    info,
    price,
    categoryId,
    stock,
    additionalInfo,
    colour,
    seatingCapacity,
    discountPercentage,
    images
  ) => {
    const findProduct = await productModel.findOne({
      categoryId,
      name,
      isDeleted: false,
    });

    if (findProduct) {
      throw new AppError(
        "Product already exist",
        "Field validation error:SProduct already exist",
        409
      );
    }
    let discountPrice = null;
    if (discountPercentage) {
      discountPrice = await addProductService(discountPercentage, price);
    }

    const saveProduct = new productModel({
      name: name,
      description: description,
      info: info,
      price: price,
      categoryId: categoryId,
      stock: stock,
      additionalInfo: additionalInfo,
      discountPercentage: discountPercentage || 0,
      discountPrice: discountPrice || price,
      colour: colour,
      seatingCapacity: seatingCapacity,
      images: images,
    });
    await saveProduct.save();
    return saveProduct;
  },

  getAllProductsByCategoryDb: async (categoryId) => {
    const findProduct = await productModel.find({
      isDeleted: false,
      categoryId: categoryId,
    });
    if (findProduct.length === 0) {
      throw new AppError(
        "No products available",
        "Field validation error:No products available",
        404
      );
    }
    return findProduct;
  },

  getProductByIdDb: async (productId) => {
    const findProduct = await productModel.findById(productId);

    if (!findProduct) {
      throw new AppError(
        "No products available",
        "Field validation error:Product already exist",
        404
      );
    }
    return findProduct;
  },

  updateProductDb: async (
    name,
    description,
    info,
    price,
    categoryId,
    stock,
    productId,
    images
  ) => {
    const updateProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        name: name,
        description: description,
        info: info,
        price: price,
        categoryId: categoryId,
        stock: stock,
        images: images,
      },
      { new: true }
    );

    if (!updateProduct) {
      throw new AppError(
        "Product not updated.Please try again",
        "Field validation error:Product not updated.Please try again",
        400
      );
    }

    await updateProduct.save();
    return updateProduct;
  },

  deleteProductDb: async (productId) => {
    const deletedProduct = await productModel.findByIdAndUpdate(productId, {
      isDeleted: true,
    });

    if (!deletedProduct) {
      throw new AppError(
        "Product not deleted.Please try again",
        "Field validation error:Product not deleted.Please try again",
        400
      );
    }
  },
};

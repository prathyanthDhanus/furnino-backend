const {
  addProductDb,
  getAllProductsByCategoryDb,
  getProductByIdDb,
  updateProductDb,
  deleteProductDb,
} = require("./services/db");

module.exports = {
  //================= create product ===================

  addProduct: async (req, res) => {
    const {
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
    } = req.body;


    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No files uploaded",
      });
    }

    // Extract Cloudinary URLs from the file data provided by multer-storage-cloudinary
    const images = req.files.map((file) => file.path);

    const saveProduct = await addProductDb(
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
    );

    return res.status(200).json({
      status: "success",
      message: "Product created successfully",
      data: saveProduct,
    });
  },

  //================= get all products based on category ===================

  getAllProductsByCategory: async (req, res) => {
    const { categoryId } = req.query;
    const findProduct = await getAllProductsByCategoryDb(categoryId);
    return res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: findProduct,
    });
  },

  //================= get  product based on product id ===================

  getProductById: async (req, res) => {
    const productId = req.params.productId;
    const findProduct = await getProductByIdDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: findProduct,
    });
  },

  //================= update product ===================

  updateProduct: async (req, res) => {
    const { name, description, info, price, categoryId, stock, productId } =
      req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    const updateProduct = await updateProductDb(
      name,
      description,
      info,
      price,
      categoryId,
      stock,
      images,
      productId
    );
    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updateProduct,
    });
  },

  //================= delete product ===================

  deleteProduct: async (req, res) => {
    const productId = req.query;
    const deleteProduct = await deleteProductDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: updateProduct,
    });
  },
};

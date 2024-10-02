const {addProductDb,getAllProductsDb,getProductByIdDb,updateProductDb,deleteProductDb} = require("./services/db");

module.exports = {
  addProduct: async (req, res) => {
    const { name, description, info, price, categoryId, stock } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    const saveProduct = await addProductDb(
      name,
      description,
      info,
      price,
      categoryId,
      stock,images
    );
    return res.status(200).json({
      status: "success",
      message: "Product created successfully",
      data: saveProduct,
    });
  },

  getAllProducts :async(req,res)=>{

    const findProduct = await getAllProductsDb();
    return res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: findProduct,
      });

  },

  getProductByIdDb :async(req,res)=>{

    const productId = req.query;
    const findProduct = await getProductByIdDb(productId);
    return res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        data: findProduct,
      });

  },  

  updateProduct : async(req,res)=>{
    const { name, description, info, price, categoryId, stock ,productId} = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];
    const updateProduct = await updateProductDb(
      name,
      description,
      info,
      price,
      categoryId,
      stock,images,productId
    );
    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updateProduct,
    });
    
  },

  deleteProduct : async(req,res)=>{
    
    const productId = req.query;
    const deleteProduct = await deleteProductDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: updateProduct,
    });
  }
};

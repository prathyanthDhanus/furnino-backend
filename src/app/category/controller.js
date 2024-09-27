const {
  addCategoryDb,
  getAllCategoryDb,
  updateCategoryDb,
  deleteCategoryDb,
} = require("../category/services/db");

module.exports = {
  //================= add category ===================

  addCategory: async (req, res) => {
    const { categoryName } = req.body;
    const imagePath = req.file.path;
    const saveCategory = await addCategoryDb(categoryName, imagePath);
    return res.status(200).json({
      status: "success",
      message: "Category added successfully",
      data: saveCategory,
    });
  },

  //================= get all category ===================

  getAllCategory: async (req, res) => {
    const getCategory = await getAllCategoryDb();
    return res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: getCategory,
    });
  },

  //================= update category ===================

  updateCategory: async (req, res) => {
    const { categoryId } = req.query;
    const { categoryName } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path;
    }
    const updateCategory = await updateCategoryDb(
      categoryId,
      categoryName,
      imagePath
    );
    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: updateCategory,
    });
  },

  //================= delete category ===================

  deleteCategory: async (req, res) => {
    const { categoryId } = req.query;
    const deleteCategory = await deleteCategoryDb(categoryId);
    return res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: deleteCategory,
    });
  },
};

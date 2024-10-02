const {
  addSubCategoryDb,
  getAllSubCategoryDb,
  updateSubCategoryDb,
  deleteSubCategoryDb
} = require("../subCategory/services/db");

module.exports = {

  //================= add sub category ===================

  addSubCategory: async (req, res) => {
    const { subCategoryName, categoryId } = req.body;
    const imagePath = req.file.path;
    const saveSubCategory = await addSubCategoryDb(
      subCategoryName,
      categoryId,
      imagePath
    );
    return res.status(200).json({
      status: "success",
      message: "Sub_category added successfully",
      data: saveSubCategory,
    });
  },

  //================= get all sub category ===================

  getAllSubCategory: async (req, res) => {
    const getAllSubCategory = await getAllSubCategoryDb();
    return res.status(200).json({
      status: "success",
      message: "Sub_category fetched successfully",
      data: getAllSubCategory,
    });
  },

  //================= update sub category ===================

  updateSubCategory: async (req, res) => {
    const { subCategoryId } = req.query;
    const { subCategoryName, categoryId } = req.body;
    const imagePath = req.file.path;
    const updateSubCategory = await updateSubCategoryDb(
      subCategoryId,
      subCategoryName,
      categoryId,
      imagePath
    );
    return res.status(200).json({
      status: "success",
      message: "Sub_category updated successfully",
      data: updateSubCategory,
    });
  },

  //================= delete sub category ===================

  deleteSubCategory: async (req, res) => {
    const { subCategoryId } = req.query;
    const deleteCategory = await deleteSubCategoryDb(subCategoryId);
    return res.status(200).json({
      status: "success",
      message: "Sub_category deleted successfully",
      data: deleteCategory,
    });
  },
};

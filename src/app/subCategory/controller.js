const { addSubCategoryDb,getAllSubCategoryDb } = require("../subCategory/services/db");

module.exports = {
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
      message: "Sub category added successfully",
      data: saveSubCategory,
    });
  },

  getAllSubCategory: async (req, res) => {
    const getAllSubCategory = await getAllSubCategoryDb();
    return res.status(200).json({
      status: "success",
      message: "Sub category fetched successfully",
      data: getAllSubCategory,
    });
  },
};

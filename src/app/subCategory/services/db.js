const subCategoryModal = require("../../subCategory/model/subCategorySchema");
const cloudinary = require("cloudinary").v2;
const AppError = require("../../../utils/appError");

module.exports = {
  addSubCategoryDb: async (subCategoryName, categoryId, imagePath) => {
    const findSubCategory = await subCategoryModal.findOne({
      subCategoryName: subCategoryName,
      categoryId: categoryId,
    });
    if (findSubCategory) {
      throw new AppError(
        "Field validation error:Sub_category already exist",
        "Sub_category already exist",
        409
      );
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "categories", // Specify a folder in Cloudinary
    });

    const saveSubCategory = new subCategoryModal({
      subCategoryName: subCategoryName,
      categoryId: categoryId,
      image: result.secure_url,
    });
    await saveSubCategory.save();
    return saveSubCategory;
  },

  getAllSubCategoryDb: async () => {
    const findSubCategory = await subCategoryModal.find();
    if (findSubCategory.length === 0) {
      throw new AppError(
        "Field validation error:Sub_category already exist",
        "Sub_category already exist",
        409
      );
    }
    return findSubCategory;
  },
};

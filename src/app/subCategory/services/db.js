const subCategoryModel = require("../../subCategory/model/subCategorySchema");
const cloudinary = require("cloudinary").v2;
const AppError = require("../../../utils/appError");

module.exports = {
  //================= add sub category ===================
  addSubCategoryDb: async (subCategoryName, categoryId, imagePath) => {
    const findSubCategory = await subCategoryModel.findOne({
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

    const saveSubCategory = new subCategoryModel({
      subCategoryName: subCategoryName,
      categoryId: categoryId,
      image: result.secure_url,
    });
    await saveSubCategory.save();
    return saveSubCategory;
  },

  //================= get all sub category ===================

  getAllSubCategoryDb: async () => {
    const findSubCategory = await subCategoryModel.find();
    if (findSubCategory.length === 0) {
      throw new AppError(
        "Field validation error:Sub_category already exist",
        "Sub_category already exist",
        409
      );
    }
    return findSubCategory;
  },

  //================= update sub category ===================

  updateSubCategoryDb: async (
    subCategoryId,
    subCategoryName,
    categoryId,
    imagePath
  ) => {
    const findSubCategory = await subCategoryModel.findOne({
      _id: subCategoryId,
      isDeleted: false,
    });
    if (!findSubCategory) {
      throw new AppError(
        "Field validation error:Sub_category not dound ",
        "Sub_category not dound",
        409
      );
    }

    let updatedData = {
      subCategoryName: subCategoryName,
      categoryId: categoryId,
    };
    if (imagePath) {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "categories",
      });

      // Delete the old image from Cloudinary
      const oldImagePublicId = findSubCategory.image
        .split("/")
        .pop()
        .split(".")[0]; // Extract the public ID
      await cloudinary.uploader.destroy(`categories/${oldImagePublicId}`);

      // Update the image field in the database
      updatedData.image = result.secure_url;
    }
    // Update the category name and image if provided
    const updateCategory = await subCategoryModel.findByIdAndUpdate(
      subCategoryId,
      updatedData,
      { new: true }
    );

    return updateCategory;
  },

  //================= delete sub category ===================

  deleteSubCategoryDb: async (subCategoryId) => {
    // Find the category
    const findCategory = await subCategoryModel.findById(subCategoryId);

    if (!findCategory || findCategory.isDeleted) {
      throw new AppError(
        "Category not found",
        "Field validation error:Sub_category not found",
        404
      );
    }

    // Soft delete the category
    findCategory.isDeleted = true;
    await findCategory.save();

    // Delete the image from Cloudinary
    const imagePublicId = findCategory.image.split("/").pop().split(".")[0]; // Extract the public ID
    await cloudinary.uploader.destroy(`categories/${imagePublicId}`);

    return findCategory;
  },
};

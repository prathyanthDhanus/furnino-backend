const categoryModel = require("../model/categorySchema");
const cloudinary = require("cloudinary").v2;
const AppError = require("../../../utils/appError");

module.exports = {

    //================= add new category ===================

  addCategoryDb: async (categoryName, imagePath) => {
    // Find if the category already exists
    const findCategory = await categoryModel.find({
      categoryName: categoryName,
      isDeleted: false,
    });

    console.log("findCategory", findCategory);
    if (findCategory.length > 0) {
      throw new AppError(
        "Field validation error:Category already exist",
        "Category already exist",
        409
      );
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "categories", // Specify a folder in Cloudinary
    });

    // Category doesn't exist, so save the category name
    const createCategory = new categoryModel({
      categoryName: categoryName,
      image: result.secure_url, // Save the secure URL of the uploaded image
    });
    await createCategory.save();
    return createCategory;
  },

  //================= get all category ===================

  getAllCategoryDb: async () => {
    const findCategory = await categoryModel.find({ isDeleted: false });

    if (findCategory.length === 0) {
      throw new AppError(
        "Field validation error:Category not found",
        "Category not found",
        404
      );
    }
    return findCategory;
  },

  //================= update category ===================

  updateCategoryDb: async (categoryId, categoryName, imagePath = null) => {
    // Find the category
    const findCategory = await categoryModel.findOne({
      _id: categoryId,
      isDeleted: false,
    });

    if (!findCategory) {
      throw new AppError(
        "Field validation error:Category not found",
        "Category not found",
        404
      );
    }

    // If a new image is provided, update the image in Cloudinary
    let updatedData = { categoryName: categoryName };
    if (imagePath) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "categories",
      });

      // Delete the old image from Cloudinary
      const oldImagePublicId = findCategory.image
        .split("/")
        .pop()
        .split(".")[0]; // Extract the public ID
      await cloudinary.uploader.destroy(`categories/${oldImagePublicId}`);

      // Update the image field in the database
      updatedData.image = result.secure_url;
    }

    // Update the category name and image if provided
    const updateCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );

    return updateCategory;
  },

  //================= delete category ===================

  deleteCategoryDb: async (categoryId) => {
    // Find the category
    const findCategory = await categoryModel.findById(categoryId);

    if (!findCategory || findCategory.isDeleted) {
      throw new AppError("Category not found", 404);
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

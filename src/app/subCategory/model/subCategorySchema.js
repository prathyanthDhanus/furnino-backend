const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required:true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  image : {
    type:String
  }
});

const subCategory = mongoose.model("subcategory", subCategorySchema);
module.exports = subCategory;

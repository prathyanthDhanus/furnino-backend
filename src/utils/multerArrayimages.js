const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Function to configure the folder dynamically
const storage = (folder) => new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: folder, // Dynamic folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer setup for handling multiple images
const uploadMultiple = (folder) => multer({ storage: storage(folder) }).array("images", 5); // Handle array of up to 5 images

module.exports = {
  uploadMultiple,
};

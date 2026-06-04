const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../.config/cloudinary.config");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif", "gif", "heic"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  cloud_api: process.env.CLOUD_API,
  cloud_secret: process.env.CLOUD_SECRET,
});

module.exports = cloudinary;

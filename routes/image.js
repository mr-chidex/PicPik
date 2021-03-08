const express = require("express");
const router = express.Router();

const {
  deleteImage,
  updateImage,
  getImage,
  getImages,
  addImage,
} = require("../controllers/image");

router.route("/").get(getImages).post(addImage);
router.route("/:imageId").put(updateImage).delete(deleteImage);

module.exports = router;

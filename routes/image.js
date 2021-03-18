const expressPromise = require("express-promise-router");
const router = expressPromise();

const {
  deleteImage,
  updateImage,
  getImage,
  getImages,
  addImage,
} = require("../controllers/image");

const imageUpload = require("../middleware/multer");

router.route("/").get(getImages).post(imageUpload.single("image"), addImage);
router.route("/:imageId").put(updateImage).delete(deleteImage).get(getImage);

module.exports = router;

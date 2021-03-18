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
router
  .route("/:imageId")
  .put(imageUpload.single("image"), updateImage)
  .delete(imageUpload.single("image"), deleteImage)
  .get(getImage);

module.exports = router;

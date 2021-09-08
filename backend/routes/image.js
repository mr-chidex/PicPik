const expressPromise = require("express-promise-router");
const router = expressPromise();

const {
  deleteImage,
  getImage,
  getImages,
  addImage,
} = require("../controllers/image");
const authUser = require("../middleware/auth");
const imageUpload = require("../middleware/multer");

router
  .route("/")
  .get(getImages)
  .post(authUser, imageUpload.single("image"), addImage);

router
  .route("/:imageId")
  .delete(authUser, imageUpload.single("image"), deleteImage)
  .get(getImage);

module.exports = router;

const expressPromise = require("express-promise-router");
const router = expressPromise();

const {
  signup,
  signin,
  updateProfile,
  passwordReset,
} = require("../controllers/user");
const {
  signInVal,
  signUpVal,
  UpdateProfileVal,
  passwordResetVal,
} = require("../middleware/validation");
const authUser = require("../middleware/auth");
const imageUpload = require("../middleware/multer");

router.route("/signup").post(signUpVal, signup);

router.route("/signin").post(signInVal, signin);

router.route("/password-reset").post(authUser, passwordResetVal, passwordReset);

router
  .route("/update")
  .post(authUser, imageUpload.single("image"), UpdateProfileVal, updateProfile);

module.exports = router;

const expressPromise = require("express-promise-router");
const router = expressPromise();

const { signup, signin } = require("../controllers/user");
const uploadImage = require("../middleware/multer");

router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports = router;

const expressPromise = require("express-promise-router");
const router = expressPromise();

const { signup, signin } = require("../controllers/user");
const { signInVal, signUpVal } = require("../middleware/validation");

router.route("/signup").post(signUpVal, signup);
router.route("/signin").post(signInVal, signin);

module.exports = router;

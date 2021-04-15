const { body } = require("express-validator");

exports.signInVal = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("invalid email input"),
  body("password").trim(),
];

exports.signUpVal = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("invalid email input"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 chars long"),
  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name should be at least 3 chars long"),
  body("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name should be at least 3 chars long"),
];

const { body } = require("express-validator");

exports.signInVal = [
  body("email").trim().isEmail().normalizeEmail(),
  body("password").trim(),
];

exports.signUpVal = [
  body("email").trim().isEmail().normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().isLength({ min: 3 }),
];

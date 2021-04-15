const bcryptjs = require("bcryptjs");
const { User, getToken } = require("../models/user");
const { validationResult } = require("express-validator");

//@Route  POST /api/users/signup
//@access    	Public
//@desc      signup new users
const signup = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(400).json({ messgae: error.array()[0].msg });

  const { firstname, lastname, email, password } = req.body;
  console.log(req.body);

  const oldUser = await User.findOne({ email });

  //check if email already in use
  if (oldUser) return res.status(400).json({ message: "email already in use" });

  const user = await new User({ firstname, lastname, email, password });

  await user.save();

  res.status(201).json({ message: "successfully signed up" });
};

//@Route  POST /api/users/signin
//@access    	Public
//@desc      signin users
const signin = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(400).json({ messgae: error.array()[0].msg });

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({ message: "email or password is incorrect" });

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "email or password is incorrect" });

  const token = getToken(user);

  res.json({
    isAdmin: user.isAdmin,
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    image: user.image,
    image_id: user.image_id,
    token,
  });
};

module.exports = { signup, signin };

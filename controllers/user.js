const User = require("../models/user");

//@Route  POST /api/users/signup
//@access    	Public
//@desc      signup new users
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const oldUser = User.findOne({ email });

  //check if email already in use
  if (oldUser) return res.status(400).json({ message: "email already in use" });

  const user = await new User({ name, email, password });

  await user.save();

  res.status(201).json({ message: "successfully signed up" });
};

//@Route  POST /api/users/signin
//@access    	Public
//@desc      signin users
const signin = (req, res, next) => {
  res.json({ message: "sign in" });
};

module.exports = { signup, signin };

const bcryptjs = require("bcryptjs")
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
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (!user)
    return res.status(400).json({ message: "email or password is incorrect" });

  const isMatch = await bcryptjs.compare(password, user.password)

  if (!isMatch) return res.status(400).json({ message: "email or password is incorrect" })

  if (!user)
    return res.status(400).json({ message: "email or password is invalid" });
    
  res.json({ message: "sign in" });
};

module.exports = { signup, signin };

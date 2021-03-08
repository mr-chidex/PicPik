//@Route  POST /api/users/signup
//@access    	Public
//@desc      signup new users
const signup = (req, res, next) => {
  res.json({ message: "sign up" });
};

//@Route  POST /api/users/signin
//@access    	Public
//@desc      signin users
const signin = (req, res, next) => {
  res.json({ message: "sign in" });
};

module.exports = { signup, signin };

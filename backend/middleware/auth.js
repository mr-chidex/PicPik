const JWT = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(400).json({ message: "No authorization header" });

    if (!req.headers.authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "Invalid token format" });

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decodeToken = JWT.verify(token, process.env.SECRET_KEY);

    // console.log("decodeToken", decodeToken);
    if (!decodeToken) res.status(401).json({ message: "Unauthorized access" });

    const user = await User.findById(decodeToken.payload);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

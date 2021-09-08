const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const { User, getToken } = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const foldername = "chi_splash";

//@Route  POST /api/users/signup
//@access    	Public
//@desc      signup new users
const signup = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(400).json({ message: error.array()[0].msg });

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
    return res.status(400).json({ message: error.array()[0].msg });

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
    images: user.images,
    token,
  });
};

//@Route  /api/user/update
//@Access   Private
//@Desc   Update user profile
const updateProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(400).json({ message: "User does not exist" });

  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(422).json({ message: error.array()[0].msg });

  const { firstname, lastname } = req.body;

  user.firstname = firstname;
  user.lastname = lastname;

  //If a profile image was added by user
  if (req.file) {
    const imageCloud = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: foldername,
    });

    if (!imageCloud)
      return res.status(400).json({ message: "error uploading image" });

    //if user has an existing profile image
    if (user.image_id) {
      //ddelete existing image from cloud
      await cloudinary.v2.uploader.destroy(`${foldername}/${user.image_id}`);
    }

    //update user profile image
    user.image = imageCloud.secure_url;
    user.image_id = imageCloud.public_id.split("/")[1];
  }

  await user.save();

  res.status(200).json({
    message: "profile updated successfully",
    user: {
      images: user.images,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      image: user.image,
      image_id: user.image_id,
      _id: user._id,
    },
  });
};

const passwordReset = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(400).json({ message: "User does not exist" });

  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(422).json({ message: error.array()[0].msg });

  const { currentPassword, newPassword } = req.body;

  const isMatch = await bcryptjs.compare(currentPassword, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "current password is incorrect" });

  user.password = newPassword;

  user.save();

  return res.status(200).json({ message: "password update successfully" });
};

module.exports = { signup, signin, updateProfile, passwordReset };

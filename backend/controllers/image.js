const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const Image = require("../models/image");
const { User } = require("../models/user");
const foldername = "chi_splash";

//@Route  POST /api/image/
//@access    	Private
//@desc      add new image
const addImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "no image selected" });

  //check image size
  if (req.file.size > 500000)
    return res.status(400).json({ message: "image too large. min 500kb" });

  const imageCloud = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: foldername,
  });

  if (!imageCloud)
    return res.status(400).json({ message: "error saving image" });

  //used split to get public_id because a folder was specified for the image
  const image = new Image({
    name: req.file.originalname,
    url: imageCloud.secure_url,
    image_id: imageCloud.public_id.split("/")[1],
    author: req.user._id,
  });

  await image.save();

  //Add image to user's model
  const user = await User.findById(req.user._id);
  user.images = [
    ...user.images,
    {
      url: imageCloud.secure_url,
      image_id: imageCloud.public_id.split("/")[1],
      _id: image._id,
    },
  ];

  await user.save();

  res.status(201).json({ message: "image successfully added", image });
};

//@Route  GET /api/image/
//@access    	Public
//@desc      get all images
const getImages = async (req, res) => {
  const total = await Image.countDocuments();
  const pageNo = parseInt(req.query._start) || 1;
  const limit = parseInt(req.query._limit) || total;
  const _start = (pageNo - 1) * limit;

  const images = await Image.find()
    .select("-__v")
    .sort({ _id: -1 })
    .skip(_start)
    .limit(limit);

  res.json({ images, total });
};

//@Route  GET /api/image/:imageId
//@access    	Public
//@desc      get image
const getImage = async (req, res) => {
  const imageId = req.params.imageId;

  if (!mongoose.isValidObjectId(imageId))
    return res.status(400).json({ message: "Invalid image id" });

  const image = await Image.findById(imageId)
    .populate("author", "firstname lastname email _id image")
    .select("-__v ");

  if (!image) return res.status(404).json({ message: "image does not exist" });

  res.json(image);
};

//@Route  PUT /api/image/:imageId(image_id)
//@access    	Private
//@desc      delete image
const deleteImage = async (req, res) => {
  const imageId = req.params.imageId;

  if (!imageId) return res.status(400).json({ message: "invalid image id" });

  //check if image exist and if user macthes the image author
  const image = await Image.findOne({
    image_id: imageId,
    author: req.user._id,
  });

  if (!image)
    return res
      .status(403)
      .json({ message: "Access denied. Can't delete image." });

  //delete image from cloudinary
  await cloudinary.v2.uploader.destroy(`${foldername}/${imageId}`);

  //delete from Image db
  await Image.deleteOne({ image_id: imageId });

  //remove image from user's image db
  const user = req.user;
  user.images = user.images.filter((image) => image.image_id !== imageId);

  user.save();

  res.json({ message: "image successfully deleted" });
};

module.exports = { deleteImage, getImage, getImages, addImage };

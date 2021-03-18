const mongoose = require("mongoose");
const cloudinary = require("../handlers/cloudinary");
const Image = require("../models/image");
const foldername = "chi_splash";

//@Route  POST /api/image/
//@access    	Private
//@desc      add new image
const addImage = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: "no image selected" });

  const imageCloud = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: foldername,
  });

  if (!imageCloud)
    return res.status(400).json({ message: "error saving image" });

  //used split to get public_id because a folder was specified for the image
  const image = await new Image({
    name: req.file.originalname,
    url: imageCloud.secure_url,
    image_id: imageCloud.public_id.split("/")[1],
    author: "60534800d9c95139b4593800",
  });

  await image.save();

  res.status(201).json({ message: "image successfully added", image });
};

//@Route  GET /api/image/
//@access    	Public
//@desc      get all images
const getImages = async (req, res, next) => {
  const images = await Image.find();

  if (!images) return res.staus(404).json({ message: "error getting images" });

  res.json({ images });
};

//@Route  GET /api/image/:imageId
//@access    	Public
//@desc      get image
const getImage = async (req, res, next) => {
  const imageId = req.params.imageId;

  if (!mongoose.isValidObjectId(imageId))
    return res.status(400).json({ message: "Invalid image id" });

  const image = await Image.findById(imageId).select("-__v ");

  if (!image) return res.status(404).json({ message: "image does not exist" });

  res.json(image);
};

//@Route  PUT /api/image/:imageId(image_id)
//@access    	Private
//@desc      edit image
const updateImage = async (req, res, next) => {
  const imageId = req.params.imageId;

  if (!imageId) return res.status(400).json({ message: "invalid image id" });

  const image = await Image.findOne({ image_id: imageId });

  //check if image exist in db
  if (!image) return res.status(404).json({ message: "image does not exist" });

  if (!req.file)
    return res.status(400).json({ message: "no image selected for update" });

  //delete old image from cloud
  await cloudinary.v2.uploader.destroy(`${foldername}/${imageId}`);

  //save new image to cloud
  const newImage = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: foldername,
  });

  //update image
  image.url = newImage.secure_url;
  image.name = req.file.originalname;
  image.image_id = newImage.public_id.split("/")[1];

  await image.save();

  res.json(image);
};

//@Route  PUT /api/image/:imageId(image_id)
//@access    	Private
//@desc      edit image
const deleteImage = async (req, res, next) => {
  const imageId = req.params.imageId;

  if (!imageId) return res.status(400).json({ message: "invalid image id" });

  const image = await Image.findOne({ image_id: imageId });

  if (!image) return res.status(404).json({ message: "image does not exist" });

  //delete image from cloudinary
  await cloudinary.v2.uploader.destroy(`${foldername}/${imageId}`);

  //delete from db
  await Image.deleteOne({ image_id: imageId });

  res.json({ message: "image successfully deleted" });
};

module.exports = { deleteImage, updateImage, getImage, getImages, addImage };

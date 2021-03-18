const cloudinary = require("../handlers/cloudinary");
const Image = require("../models/image");

//@Route  POST /api/image/
//@access    	Private
//@desc      add new image
const addImage = async (req, res, next) => {
  console.log(req.file);
  if (!req.file) return res.status(400).json({ message: "no image selected" });

  const imageCloud = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "chi_splash",
  });

  console.log(imageCloud);

  if (!imageCloud)
    return res.status(400).json({ message: "error saving image" });

  //used split to get public_id because a folder was specified for the image
  const image = await new Image({
    name: req.file.originalname,
    url: imageCloud.secure_url,
    image_id: imageCloud.public_id.split("/")[1],
  });

  await image.save();

  res.json({ message: "image successfully added", image });
};

//@Route  GET /api/image/
//@access    	Public
//@desc      get all images
const getImages = (req, res, next) => {
  res.json({ message: "getImages" });
};

//@Route  GET /api/image/:imageId
//@access    	Public
//@desc      get image
const getImage = (req, res, next) => {
  res.json({ message: "getImage" });
};

//@Route  PUT /api/image/:imageId
//@access    	Private
//@desc      edit image
const updateImage = (req, res, next) => {
  res.json({ message: "updateImage" });
};

//@Route  PUT /api/image/:imageId
//@access    	Private
//@desc      edit image
const deleteImage = (req, res, next) => {
  res.json({ message: "deleteImage" });
};

module.exports = { deleteImage, updateImage, getImage, getImages, addImage };

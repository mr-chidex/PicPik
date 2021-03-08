//@Route  POST /api/image/
//@access    	Private
//@desc      add new image
const addImage = (req, res, next) => {
  res.json({ message: "addImage" });
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

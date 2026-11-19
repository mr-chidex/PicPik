import mongoose from "mongoose";
import dbConnect from "../../../../lib/server/dbConnect";
import { requireUser } from "../../../../lib/server/auth";
import { handleApiError, methodNotAllowed } from "../../../../lib/server/api";
import cloudinary from "../../../../lib/server/cloudinary";
import Image from "../../../../models/Image";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "DELETE") {
    return methodNotAllowed(res, "GET, DELETE");
  }

  try {
    await dbConnect();
    const { imageId } = req.query;

    if (!mongoose.isValidObjectId(imageId)) {
      return res.status(400).json({ message: "Invalid image id" });
    }

    if (req.method === "GET") {
      const image = await Image.findById(imageId)
        .populate("author", "firstname lastname email _id image")
        .select("-__v");

      if (!image)
        return res.status(404).json({ message: "image does not exist" });
      return res.json(image);
    }

    const user = await requireUser(req);
    const image = await Image.findOne({ _id: imageId, author: user._id });
    if (!image) {
      return res
        .status(403)
        .json({ message: "Access denied. Can't delete image." });
    }

    await cloudinary.uploader.destroy(`chi_splash/${image.image_id}`);
    user.images = user.images.filter(
      (item) => item.image_id !== image.image_id,
    );
    await user.save();
    await Image.deleteOne({ _id: image._id });

    return res.json({ message: "image successfully deleted" });
  } catch (error) {
    return handleApiError(res, error);
  }
}

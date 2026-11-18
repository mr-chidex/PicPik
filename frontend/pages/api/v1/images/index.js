import dbConnect from "../../../../lib/server/dbConnect";
import { requireUser } from "../../../../lib/server/auth";
import {
  handleApiError,
  methodNotAllowed,
  parseImage,
} from "../../../../lib/server/api";
import { uploadImage } from "../../../../lib/server/cloudinary";
import Image from "../../../../models/Image";
import User from "../../../../models/User";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return methodNotAllowed(res, "GET, POST");
  }

  try {
    await dbConnect();

    if (req.method === "GET") {
      const total = await Image.countDocuments();
      const pageNo = Math.max(1, Number.parseInt(req.query._start, 10) || 1);
      const requestedLimit = Number.parseInt(req.query._limit, 10);
      const limit = requestedLimit > 0 ? requestedLimit : total;
      const images = await Image.find()
        .select("-__v")
        .sort({ _id: -1 })
        .skip((pageNo - 1) * limit)
        .limit(limit);

      return res.json({ images, total });
    }

    const authenticatedUser = await requireUser(req);
    await parseImage(req, res);
    if (!req.file)
      return res.status(400).json({ message: "no image selected" });

    const uploaded = await uploadImage(req.file.buffer);
    const imageId = uploaded.public_id.split("/").slice(1).join("/");
    const image = await Image.create({
      name: req.file.originalname,
      url: uploaded.secure_url,
      image_id: imageId,
      author: authenticatedUser._id,
    });

    const user = await User.findById(authenticatedUser._id);
    user.images.push({
      url: uploaded.secure_url,
      image_id: imageId,
      _id: image._id,
    });
    await user.save();

    return res.status(201).json({ message: "image successfully added", image });
  } catch (error) {
    return handleApiError(res, error);
  }
}

import dbConnect from "../../../../lib/server/dbConnect";
import { requireUser } from "../../../../lib/server/auth";
import {
  handleApiError,
  methodNotAllowed,
  parseImage,
  validName,
} from "../../../../lib/server/api";
import cloudinary, { uploadImage } from "../../../../lib/server/cloudinary";
import User from "../../../../models/User";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, "POST");

  try {
    await dbConnect();
    const authenticatedUser = await requireUser(req);
    if (authenticatedUser.isTestUser) {
      return res
        .status(403)
        .json({ message: "Access denied. Test user cannot update profile." });
    }

    await parseImage(req, res);
    const { firstname, lastname } = req.body || {};
    if (!validName(firstname)) {
      return res
        .status(422)
        .json({ message: "firstname name should be at least 3 chars long" });
    }
    if (!validName(lastname)) {
      return res
        .status(422)
        .json({ message: "lastname should be at least 3 chars long" });
    }

    const user = await User.findById(authenticatedUser._id);
    if (!user) return res.status(400).json({ message: "User does not exist" });

    user.firstname = firstname.trim();
    user.lastname = lastname.trim();

    if (req.file) {
      const uploaded = await uploadImage(req.file.buffer);
      if (user.image_id)
        await cloudinary.uploader.destroy(`chi_splash/${user.image_id}`);
      user.image = uploaded.secure_url;
      user.image_id = uploaded.public_id.split("/").slice(1).join("/");
    }

    await user.save();

    return res.status(200).json({
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
  } catch (error) {
    return handleApiError(res, error);
  }
}

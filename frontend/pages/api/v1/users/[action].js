import bcrypt from "bcryptjs";
import dbConnect from "../../../../lib/server/dbConnect";
import { createToken, requireUser } from "../../../../lib/server/auth";
import {
  handleApiError,
  methodNotAllowed,
  validEmail,
  validName,
  validPassword,
} from "../../../../lib/server/api";
import User from "../../../../models/User";

export default async function handler(req, res) {
  const { action } = req.query;

  try {
    await dbConnect();

    if (action === "signup") {
      if (req.method !== "POST") return methodNotAllowed(res, "POST");

      const { firstname, lastname, email, password } = req.body || {};
      if (!validEmail(email))
        return res.status(400).json({ message: "invalid email input" });
      if (!validPassword(password))
        return res
          .status(400)
          .json({ message: "password should be at least 5 chars long" });
      if (!validName(firstname) || !validName(lastname)) {
        return res
          .status(400)
          .json({ message: "name should be at least 3 chars long" });
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (await User.findOne({ email: normalizedEmail })) {
        return res.status(400).json({ message: "email already in use" });
      }

      await User.create({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: normalizedEmail,
        password: password.trim(),
      });

      return res.status(201).json({ message: "successfully signed up" });
    }

    if (action === "signin") {
      if (req.method !== "POST") return methodNotAllowed(res, "POST");

      const { email, password } = req.body || {};
      if (!validEmail(email) || typeof password !== "string") {
        return res.status(400).json({ message: "invalid email input" });
      }

      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .json({ message: "email or password is incorrect" });
      }

      return res.json({
        isAdmin: user.isAdmin,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image: user.image,
        image_id: user.image_id,
        images: user.images,
        token: createToken(user),
      });
    }

    if (action === "password-reset") {
      if (req.method !== "POST") return methodNotAllowed(res, "POST");

      const user = await requireUser(req);
      if (user.isTestUser) {
        return res
          .status(403)
          .json({
            message: "Access denied. Test user cannot update password.",
          });
      }

      const { currentPassword, newPassword } = req.body || {};
      if (!validPassword(currentPassword)) {
        return res
          .status(422)
          .json({
            message: "current password should be at least 5 chars long",
          });
      }
      if (!validPassword(newPassword)) {
        return res
          .status(422)
          .json({ message: "new password should be at least 5 chars long" });
      }
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res
          .status(400)
          .json({ message: "current password is incorrect" });
      }

      user.password = newPassword;
      await user.save();
      return res.status(200).json({ message: "password update successfully" });
    }

    return res.status(404).json({ message: "Endpoint does not exist" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "email already in use" });
    }
    return handleApiError(res, error);
  }
}

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lower: true, unique: true },
    image: String,
    image_id: String,
    password: { type: String, required: true },
    images: [
      {
        url: String,
        image_id: String,
      },
    ],
    isAdmin: { type: Boolean, default: false },
    isTestUser: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.models.User || mongoose.model("User", userSchema);

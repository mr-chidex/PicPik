const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lower: true,
      unique: true,
    },
    image: {
      type: String,
    },
    image_id: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

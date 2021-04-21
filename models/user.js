const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
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

const getToken = (user) => {
  return JWT.sign(
    {
      iat: Date.now(),
      payload: user._id,
      iss: "Mr-Chidex",
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

module.exports = {
  getToken,
  User: mongoose.model("User", userSchema),
};

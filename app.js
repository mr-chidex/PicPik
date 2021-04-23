const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const { User } = require("./models/user");
const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);

//handle errors
app.use((error, req, res, next) => {
  console.log("message", error);
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: error.message || "error connecting to server" });
});

//connect to db and start server
mongoose
  .connect(process.env.SPLASH_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("server running...")
    );
  })
  .then(async () => {
    //create default admin login details if admin is not in database
    const user = await User.find();
    if (!user.length > 0) {
      const admin = await new User({
        firstname: process.env.ADMIN_NAME,
        lastname: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
        isAdmin: true,
      });

      await admin.save();

      console.log("Admin succesfully added");
    }
  })
  .catch((err) => {
    throw new Error("Error connecting...");
  });

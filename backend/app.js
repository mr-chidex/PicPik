const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

const { User } = require("./models/user");
const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API by mr-chidex ",
    github: "https://www.github.com/mr-chidex",
  });
});

//@handle errors
app.use((error, _, res) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: error.message || "Network Error" });
});

//@connect to db and start server
mongoose
  .connect(process.env.DEX_PHOTOS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => console.log(`server running...on port - ${PORT}`));
  })
  .then(async () => {
    //@create default admin login details if admin is not in database
    //@create default test user details
    const user = await User.find();
    if (!user.length > 0) {
      //create admin
      const admin = new User({
        firstname: process.env.ADMIN_FIRSTNAME,
        lastname: process.env.ADMIN_LASTNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
        isAdmin: true,
        images: [],
      });

      await admin.save();
      console.log("Admin succesfully added");

      //@create test user
      const testUser = new User({
        firstname: "test",
        lastname: "user",
        email: "testuser@email.com",
        password: "11111",
        images: [],
        isTestUser: true,
      });

      await testUser.save();
      console.log("test user succesfully added");
    }
  })
  .catch((err) => {
    throw new Error("Error connecting...");
  });

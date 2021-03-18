const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");

app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);

//handle errors
app.use((error, req, res, next) => {
  console.log("messa", error);
  res.status(500).json({ message: error.message });
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
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");

app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);

app.use((error, req, res, next) => {
  console.log(error.messgae);
  res.status(500).json({ message: error.message });
});

app.listen(process.env.PORT || 5000, () => console.log("server running..."));

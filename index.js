const express = require("express");
const bodyParser = require("body-parser");
const coursesRouter = require("./routes/courses-routes");
const mongoose = require("mongoose");
const httpStatus = require("./utils/httpStatus");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const URI = process.env.MONGO_URI;

mongoose.connect(URI).then(() => {
  console.log("MongoDB server started successfully.");
});

app.use(bodyParser.json());

app.use("/api/courses", coursesRouter);

app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    data: { message: "This resource is not available" },
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

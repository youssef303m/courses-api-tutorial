const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const httpStatus = require("./utils/httpStatus");
require("dotenv").config();
const coursesRouter = require("./routes/courses-routes");
const usersRouter = require("./routes/users-routes");

const app = express();
const PORT = process.env.PORT || 3000;

const URI = process.env.MONGO_URI;

mongoose.connect(URI).then(() => {
  console.log("MongoDB server started successfully.");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    data: { message: "This resource is not available" },
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

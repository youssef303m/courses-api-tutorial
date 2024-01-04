const express = require("express");
const bodyParser = require("body-parser");
const coursesRouter = require("./routes/courses-routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const URI = process.env.MONGO_URI;

mongoose.connect(URI).then(() => {
  console.log("MongoDB server started successfully.");
});

app.use(bodyParser.json());

app.use("/api/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

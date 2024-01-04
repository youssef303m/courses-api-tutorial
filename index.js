const express = require("express");
const bodyParser = require("body-parser");
const coursesRouter = require("./routes/courses-routes");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;
const app = express();

const URI = process.env.DB_URI;

mongoose.connect(URI).then(() => {
  console.log("MongoDB server started successfully.");
});

app.use(bodyParser.json());

app.use("/api/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
